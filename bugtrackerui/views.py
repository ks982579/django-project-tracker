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
from .helpers import *
from .forms import *

@ensure_csrf_cookie
def home_page(request):
    js_files = os.listdir(path=os.path.join(".","bugtrackerui", "static", "js_react", "build", "static", "js"))
    the_react_file = [x for x in js_files if x.endswith('.js')][0]
    js_files = os.listdir(path=os.path.join(".", "bugtrackerui", "static", "js_react", "build", "static", "css"))
    the_style_file = [x for x in js_files if x.endswith('.css')][0]
    Context = {'react_file': the_react_file, 'style_file': the_style_file}
    request.session.set_test_cookie()
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

    def get(self, request, user_token: uuid.UUID):
        context = {}
        # If Token is valid - give form
        if user_token:
            pass
        # Else - Link to homepage and suggest new token
        return render(request, self.template_name, context=context)
        pass
    def post(self, request, user_token: uuid.UUID):
        the_form = PasswordResetForm(request.POST)
        print(request.POST)
        print(the_form._errors)
        if the_form.is_valid():
            """
            I had an issue where the 'name' from the import wasn't the same as the Form, and so it wasn't validating.
            """
            # Also must destroy Token!
            print("It's Valid!")
            pw1 = the_form.cleaned_data['password1']
            pw2 = the_form.cleaned_data['password2']
            if(pw1 == pw2):
                print('They are equal')
            else:
                print(pw1, pw2)
        else:
            print('Not Valid...')
            #print(the_form)
        return redirect("home-page")


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
