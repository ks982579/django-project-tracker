from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.views import View
from django.contrib.auth import authenticate, login, logout
from django.contrib.sites.shortcuts import get_current_site
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
#from rest_framework.generics import CreateAPIView

import os
import uuid
from .models import *
from .helpers import Helpers
from .forms import *

@ensure_csrf_cookie
def home_page(request):
    js_files = os.listdir(path=os.path.join(".","bugtrackerui", "static", "js_react", "build", "static", "js"))
    the_react_file = [x for x in js_files if x.endswith('.js')][0]
    js_files = os.listdir(path=os.path.join(".", "bugtrackerui", "static", "js_react", "build", "static", "css"))
    the_style_file = [x for x in js_files if x.endswith('.css')][0]
    Context = {'react_file': the_react_file, 'style_file': the_style_file}
    # request.session.set_test_cookie()
    return render(request, os.path.join('bugtrackerui','homepage.html'), Context)

# {"email":"ksullivanx23@outlook.com"}
# Set for anoymous users but require CSRF token?
class PasswordResetEmailView(APIView):
    def post(self, request):
        print(request.data)
        # if email is truthy
        if(request.data['email']):
            try:
                current_user = User.objects.get(email=request.data['email'])
                print(current_user)
                # print(request.META) -> Wow, the data in this!
                print(request.scheme)
                print(request.get_host())
                # print(request.build_absolute_uri(location=''))

                Helpers.send_password_reset_email(current_user, request)
            except Exception as err:
                print(err)
                return Response({'response': 'Email not in system'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'response':'Error'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'response':'ok'}, status=status.HTTP_200_OK)

class PasswordResetView(View):
    template_name = os.path.join('bugtrackerui','password_reset.html')

    @staticmethod
    def check_token(user_token):
        state = False
        _return = {}
        try:
            uuid_token = uuid.UUID(user_token)
            _return['payload'] = PasswordResetModel.tokens.get(password_token=uuid_token)
            state = True
        except PasswordResetModel.DoesNotExist as DNE:
            _return['http_response'] = HttpResponse("<h1>Token does not Exist...</h1>")
        except Exception as error:
            _return['http_response'] = HttpResponse("<h1>Invalid Token Provided</h1>")
        _return['status'] = state
        return _return

    def get(self, request, user_token: str):
        context = {}
        # If Token is valid - give form
        _results = self.check_token(user_token)
        print(_results['status'])
        if not _results["status"]:
            # if token failed the check, return an HTTP response here
            return _results['http_response']

        real_token = _results['payload']

        # Check Token Expiry
        if real_token.is_valid():
            pass
        else:
            return HttpResponse("<h1>Token is Invalid/Expired</h1>")
        # Else - Link to homepage and suggest new token
        return render(request, self.template_name, context=context)

    def post(self, request, user_token: str):
        # Make sure Token is still OK
        _results = self.check_token(user_token)
        if not _results["status"]:
            # if token failed the check, return an HTTP response here
            return _results['http_response']

        real_token = _results['payload']
        print(type(real_token.user))
        print(real_token.user)
        current_user = real_token.user

        the_form = PasswordResetForm(request.POST)
        if the_form.is_valid():
            """
            I had an issue where the 'name' from the import wasn't the same as the Form, and so it wasn't validating.
            """
            # Also must destroy Token!
            print("It's Valid!")
            pw1 = the_form.cleaned_data['password1']
            pw2 = the_form.cleaned_data['password2']

            # Are Passwords the same?
            if(pw1 == pw2 and len(pw1) > 1):
                print('They are equal')
                current_user.set_password(pw1)
                try:
                    current_user.save()
                except:
                    return HttpResponse('<h1>Error 500: Internal Server Error</h1>')
                # And here we would remove token
                real_token.delete()
                return HttpResponse('<h1>Password Updated</h1><a href="#">Try it out!</a>')
            else:
                print(pw1, pw2)
                return HttpResponse('<h1>Passwords did not match</h1>')
        else:
            print('Not Valid...')
            #print(the_form)
            return HttpResponse('<h1>Form was invalid</h1>')
        return HttpResponse('<h1>Something went wrong!</h1>') #redirect("home-page")


def password_reset_view(request):
    Context = {}
    return render(request, os.path.join('bugtrackerui','password_reset.html'), Context)


def login_page(request):
    if request.method == "POST":
        userName = request.POST["username"]
        passWord = request.POST["password"]
        user = authenticate(request, username=userName, password=passWord)
        if user is not None:
            login(request, user)
            print('Logged in')
            return HttpResponse('You are now logged in')
        else:
            print('Login Error')
            return HttpResponse('Error logging in')
    return HttpResponse('wtf?')

def logout_page(request):
    logout(request)
    return redirect('fake-home-page')
