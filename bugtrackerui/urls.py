from django.urls import path, include
from .views import *

urlpatterns = [
    path('', home_page, name="fake-home-page"),
    path('login/', login_page, name="fake-login-page"),
    path('forgot-password/', password_reset_view, name="forgot-password-page"),
]