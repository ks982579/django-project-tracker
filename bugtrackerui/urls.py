from django.urls import path, include
from .views import home_page, login_page

urlpatterns = [
    path('', home_page, name="fake-home-page"),
    path('login/', login_page, name="fake-login-page"),
]