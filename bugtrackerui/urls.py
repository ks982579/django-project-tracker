from django.urls import path, include
from .views import *

urlpatterns = [
    path('', home_page, name="fake-home-page"),
    path('password-reset/', PasswordResetView.as_view(), name="password-reset"),
    path('forgot-password/', password_reset_view, name="forgot-password-page"),
]