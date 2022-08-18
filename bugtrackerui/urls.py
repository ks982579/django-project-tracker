from django.urls import path, include
from .views import *

urlpatterns = [
    path('', home_page, name="home-page"),
    path('password-reset/', PasswordResetEmailView.as_view(), name="password-reset"),
    path('i-forgot-my-password/<uuid:user_token>', PasswordResetView.as_view(), name="forgot-password-page"),
]