# Django Imports
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_protect, requires_csrf_token
from django.utils.decorators import method_decorator

# Django-Rest-Framework Imports
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Other imports
import json, math
import smtplib

# Custom Imports
from .models import TaskModel, MessagesModel, SudoUserModel
from .serializers import UserSerializer, TaskSerializer, MessagesSerializer


# https://www.django-rest-framework.org/api-guide/generic-views/
## Youtube: Build a Django REST API...
## at 2:16 - 2:45 covers permissions and custom permission -> users, members, staff...
## 2:46 - Token Authentication

class Convenience:
    """
    I prefer dot notation instead of [] of the dictionaries.
    https://docs.python.org/3.10/library/functions.html?highlight=property#property
    https://docs.python.org/3.10/reference/datamodel.html?highlight=__setattr__#object.__setattr__
    """
    def __init__(self):
        pass

# localhost:8000/api/auth/
class AuthenticateUser(APIView):
    """
    Posting username and password will attempt to login user.
    Getting will logout user if they exist.
    """
    def get(self, request):
        if request.user is not None:
            logout(request)
            return Response({'logout':'successful'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'logout':'unsuccessful'}, status=status.HTTP_400_BAD_REQUEST)

    @method_decorator(requires_csrf_token)
    def post(self, request):
        user_data = request.data
        UN = user_data['username']
        PW = user_data['password']
        user = authenticate(request, username=UN, password=PW)
        if user is not None:
            print(user)
            login(request, user)
            session_data = request.session
            return Response({'login': 'successful'},status=status.HTTP_200_OK)
        return Response({'login': 'unsuccessful'}, status=status.HTTP_400_BAD_REQUEST)

# localhost:8000/api/current-user/
class GetUserInfo(APIView):
    """
    retrieves user's information if logged in.
    Else, tells client user is not logged in.
    Meant for an initial check.
    """
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    #permission_classes = [IsAuthenticated]

    #The Permissions actually prevents reaching the not-logged-in response.
    def get(self, request):
        if request.user is not None and request.user.id is not None:
            serialized_data = UserSerializer(request.user)
            return Response(serialized_data.data)
        return Response({'login status': 'not logged in'})
    def put(self, request):
        # Copy Data
        new_data = request.data.copy()
        # Get keys from data
        req_keys = new_data.keys()
        # Fetch Current User... I think the request object is a lazy one
        current_user = User.objects.get(pk=request.user.id)
        # Set values
        for _key in req_keys:
            setattr(current_user, _key, new_data.get(_key))

        current_user.save(update_fields=req_keys)
        serialized_user = UserSerializer(current_user, many=False)
        return Response(data=serialized_user.data, status=status.HTTP_200_OK)
# {"id": 1, "first_name": "Kevin", "last_name": "Sullivan", "username": "kevin_sullivan", "email": ""}

class SignupHandler(APIView):
    # https://docs.djangoproject.com/en/4.0/topics/auth/default/
    def post(self, request):

        user_info = request.data

        username_taken = False
        email_taken = False

        # Checking if credentials are taken...
        if len(User.objects.filter(username=user_info.get('username'))) > 0:
            username_taken = True
        if len(User.objects.filter(username=user_info.get('email'))) > 0:
            email_taken = True

        # If credentials taken, return error. Else, create new user.
        if username_taken or email_taken:
            return Response(data={'error': True, 'username take': username_taken, 'email taken': email_taken}, status=status.HTTP_409_CONFLICT)
        else:
            try:
                new_user = User(username=user_info.get('username'), email=user_info.get('email'), password=user_info.get('password'))
            except:
                return Response(data={'status': 'Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            print(new_user)
            new_user.save()
            # create the SudoUser
            SudoUserModel.objects.create(user=new_user)
            login(request, new_user)
            serializedUser = UserSerializer(new_user)
            return Response(data=serializedUser.data, status=status.HTTP_201_CREATED)


class NewProjectHandler(generics.CreateAPIView):
    serializer_class = TaskSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    # Slight modification of request data
    @method_decorator(requires_csrf_token)
    def post(self, request, *args, **kwargs):
        # from React request.POST is an empty QueryDict, not from DRF
        try:
            request.data._mutable = True
        except:
            pass
        # data is QueryDict -> Immutable
        # https://stackoverflow.com/questions/44717442/this-querydict-instance-is-immutable
        request.data['developers'] = [request.user.id]
        # for the DRF from -> Throws an error it was expecting a pk value
        # React requires it to be in a list though... ?
        # https://docs.djangoproject.com/en/4.0/ref/request-response/
        # Difference is probably posting raw form data
        try:
            request.data._mutable = False
        except:
            pass

        #Run .create method
        post_response = self.create(request, *args, **kwargs)
        return post_response

# localhost:4000/api/task-handler/
class TaskHandler(APIView):
    """
    dispatch handler methods for CRUD operations
    """
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def set_percent_complete(self, *args, **kwargs):
        """
        * Takes in what we just set/corrected.
        1. It would have to get the Parent object
        2. Parent gets kids, and calculates mean percentage
        3. parent then gets it's parent and so on...
        4. Ends when object has no parent.
        """
        this_kid = args[0] # expecting TaskModel object.
        print(f'Kid passed in {this_kid}')
        if this_kid.parent_task is not None:
            # the parent_task from ForeignKey is like the whole object, but not actually it
            print(f'{this_kid} || Has Parent(s)')
            this_parent = this_kid.parent_task
            new_sum = 0
            denom = 0
            for _efk in this_parent.parent_task_set.all():
                new_sum += _efk.percent_complete
                denom += 1
            this_parent.percent_complete = math.floor(new_sum/denom)
            # https://docs.djangoproject.com/en/4.0/ref/models/instances/
            this_parent.save()
            # Working way up the chain
            print(f'New Parent PC = {this_parent.percent_complete}')
            self.set_percent_complete(this_parent)
        else:
            print(f'Child has no parent...')
            return None
        return None

    def looper(self, query_set, serializer, spaces=""):
        print("Starting looper() method...")
        #creating function-variable
        task_list = [] #instantiated this as parameter = messed everything up.
        # loops through query data structures
        for _x in query_set: #Extract individual Tasks
            # Access their task query sets.
            # print(f'{spaces} {_x}')
            subQuerySet = _x.parent_task_set.all() #Get SubQueries
            serialized_task = serializer(_x, many=False) #Serialize Task
            task_data = serialized_task.data.copy()

            if len(subQuerySet) > 0:
                #Task Object's children is a task list
                # For some reason, Circular reference was happening unless we switched between json and python
                task_data['children'] = json.loads(self.looper(subQuerySet, serializer, spaces=(spaces+">")))

            task_list.append(task_data)
        # Safest to pass String data out of function...
        return json.dumps(task_list)

    # localhost:8000/api/task-handler/ :: GET
    def get(self, request, format=None):
        print('GET Started')
        #get user using pk from the request.user.id
        current_user = User.objects.get(pk=request.user.id)
        # Get all of user tasks
        user_tasks = current_user.user_task_set.all() # Returns Iterable
        #https://docs.djangoproject.com/en/4.0/ref/models/querysets/

        szd_tasks = json.loads(self.looper(user_tasks, TaskSerializer))
        # https://stackoverflow.com/questions/54343170/serializer-call-is-showing-an-typeerror-object-of-type-listserializer-is-not
        # Preservers relationship
        return Response(data=szd_tasks, status=status.HTTP_200_OK)

    #Still works as of 2022.07.07
    def post(self, request):
        """
        For creating a Task, we will require Parent Task ID
        request.data.get('parent_task') = id
        """
        # making TaskModel object.
        taskData = request.data
        print(json.dumps(taskData))
        #taskData.update({'developers': [request.user.id]}) #Not for creating a task
        serializer = TaskSerializer(data=taskData)
        if serializer.is_valid():
            serializer.save()
            post_response = Response(data=serializer.data, status=status.HTTP_201_CREATED)
            # We need to update percentages
            print(f'trying to get {type(serializer.data)}')
            self.set_percent_complete(TaskModel.objects.get(pk=serializer.data.get('id')))
        else:
            post_response = Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return post_response
#{"parent_task": 35, "task_name": "First task", "description": "Child to Second Project to test the Post Method"}

    # works again 2022.07.13
    def put(self, request):
        # Extract the data and keys to use
        data = request.data.copy()
        # data['pk'] = data.get('id')
        # remove the 'id' key so we don't try to update it
        req_keys = data.keys()
        current_task = TaskModel.objects.get(pk=data.get('id'))
        # Removing 'id' from data so we don't try to update it.
        del data['id']
        for _key in req_keys:
            # If target has kids, it may send 'null' for percentComplete.
            if data.get(_key) == None:
                continue
            # Models are objects, not dictionaries...
            setattr(current_task, _key, data.get(_key))
        # Save updated data
        current_task.save(update_fields=req_keys)
        self.set_percent_complete(current_task)

        # Serialize and return data
        serialized_task = TaskSerializer(current_task, many=False)
        return Response(data=serialized_task.data, status=status.HTTP_200_OK)
        """
        {"id": 4, "task_name": "I'll figure this out", "description": "", "end_date": null, "percent_complete": 1}
        {"id": 4, "task_name": "I'll figure this out", "description": "Update - try 3", "end_date": null, "percent_complete": 2}
        """

# {"id": 37, "description": "Child to Second Project to test the Post Method; and now the PUT"}

    def delete(self, request):
        print(request.data)
        task_id = request.data.get('id')
        this_task = TaskModel.objects.get(pk=task_id)
        parent_task = this_task.parent_task
        # Also Implement Check that user deleting is developer as well.
        print('deleting...')
        #What if can't find object?
        try:
            this_task.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if parent_task is not None:
            kids = parent_task.parent_task_set.all()
            # If parent still has children, recalc %C. Else, reset %C to 1
            if len(kids) > 0:
                self.set_percent_complete(kids[0])
            else:
                parent_task.percent_complete = 1
                parent_task.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ++++++++++++++++++++++++++++++++++++++++++++
# Messages View
# ++++++++++++++++++++++++++++++++++++++++++++
class MessageHandler(APIView):
    # Should we only save/fetch messages for 30 days?
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # fetch user from Database
        actual_user = User.objects.get(pk=request.user.id)
        # fetch messages 'to' the user
        to_user = actual_user.to_set.all()
        # Serialize
        to_user_serialized = MessagesSerializer(data=to_user, many=True)
        to_user_serialized.is_valid()
        return Response(data=to_user_serialized.data, status=status.HTTP_200_OK)

    def post(self, request):
        current_message = Convenience()
        current_message._from = User.objects.get(pk=request.user.id)
        current_message._to = User.objects.get(username=request.data['send_to'])
        current_message._subject = request.data['subject']
        current_message._body = request.data['body']

        # https://docs.djangoproject.com/en/4.0/topics/db/examples/many_to_many/
        new_message = MessagesModel(
            from_user = current_message._from,
            subject = current_message._subject,
            body = current_message._body
        )
        print(new_message)
        #new_message.save()
        #new_message.send_to.set(current_message._to)
        return Response(data={'success': 'True'}, status=status.HTTP_201_CREATED)

    def put(self, request): #Perhaps for drafts - future?
        pass
    def delete(self, request):
        pass

class MessageHandler2(generics.GenericAPIView):
    # https://docs.djangoproject.com/en/4.0/topics/db/queries/
    queryset = MessagesModel.objects.all()
    serializer_class = MessagesSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self, request):
        to_set = MessagesModel.objects.filter()

    def list(self, request):
        queryset = self.get_queryset(request)

# ++++++++++++++++++++++++++++++++++++++++++++
# Team View
# ++++++++++++++++++++++++++++++++++++++++++++
class SudoUser:
    """
    Extracting some of the logic from TeamMembersView.get()
    """
    def __init__(self, user_id):
        self.sudo = SudoUserModel.objects.get(user=User.objects.get(pk=user_id))
        self.team = self.sudo.team_members.all()

class TeamMembersView(APIView):
    def get(self, request):
        """
        Getting team members for user. User's id must be passed in through request object.
        :param request:
        :return DRF.Response = json:
        """
        sudo_user = SudoUser(request.user.id)
        searlized_team = UserSerializer(sudo_user.team, many=True)
        return Response(data=searlized_team.data, status=status.HTTP_200_OK)

    def post(self, request):
        pass
    def delete(self, request):
        pass