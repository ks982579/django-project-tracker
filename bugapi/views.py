from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import ProjectModel
from .serializers import ProjectSerializer, UserSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_protect, requires_csrf_token
from django.utils.decorators import method_decorator

# https://www.django-rest-framework.org/api-guide/generic-views/
## Youtube: Build a Django REST API...
## at 2:16 - 2:45 covers permissions and custom permission -> users, members, staff...
## 2:46 - Token Authentication

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
            print(session_data.keys())
            print(session_data.items())
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

# localhost:8000/api/
class ProjectViewGetAllClass(generics.ListAPIView):
    """
    Inherits from generics.ListAPIView, which has a 'get' method handler.
    specify the 'queryset' and 'serializer_class' to return a
    "Collection of Model Instances".
    Altered get_queryset(self) so that we get what the developer is currently working on through self.request.user
    """
    #def get(self, request):
    #queryset = ProjectModel.objects.filter(developers__pk=request.user.pk)
    serializer_class = ProjectSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return user.developer_set.all()

        #return Response(all_tasks_serialized.data, status=status.HTTP_200_OK)

# localhost:9000/api/what-i-own/
class ProjectViewGetOwnershipClass(generics.ListAPIView):
    serializer_class = ProjectSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        print(user.ownership_set.all())
        return user.ownership_set.all()

# localhost:9000/api/create/
class ProjectViewCreateClass(generics.CreateAPIView):
    """
    Provides 'post' method handler :)
    The Mixin implements creating and saving new model instance.
    Returns serialization and 201-created if successful
    """
    # Send in correct data and it posts it to database...
    # It will ignore things it doesn't require.
    # And reject if it has not what it requires 400 -> Bad Request
    serializer_class = ProjectSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # Mostly Copied directly from CreateModelMixin
    def create(self, request, *args, **kwargs):
        # This will get form data, 'title' and 'sub_title'
        temp_data = request.data

        # Getting User Proper
        currentUser = User.objects.get(pk=request.user.id)

        # Must add other required data
        temp_data['owner'] = request.user.id
        temp_data['developers'] = [request.user.id]
        print(temp_data)
        serializer = self.get_serializer(data=temp_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class ProjectViewUpdateClass(generics.UpdateAPIView):
    """
    Provides 'Put' and 'Patch' method handlers
    """
    lookup_field = 'pk'
    queryset = ProjectModel.objects.all() #change to only user
    serializer_class = ProjectSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

class ProjectViewDestroyClass(generics.DestroyAPIView):
    """
    Provides 'Delete' method handler
    """
    lookup_field = 'pk'
    queryset = ProjectModel.objects.all() #change to only user
    serializer_class = ProjectSerializer
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]