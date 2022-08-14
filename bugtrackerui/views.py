from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie

import os

@ensure_csrf_cookie
def home_page(request):
    js_files = os.listdir(path=os.path.join(".","bugtrackerui", "static", "js_react", "build", "static", "js"))
    the_react_file = [x for x in js_files if x.endswith('.js')][0]
    js_files = os.listdir(path=os.path.join(".", "bugtrackerui", "static", "js_react", "build", "static", "css"))
    the_style_file = [x for x in js_files if x.endswith('.css')][0]
    Context = {'react_file': the_react_file, 'style_file': the_style_file}
    return render(request, os.path.join('bugtrackerui','homepage.html'), Context)

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
