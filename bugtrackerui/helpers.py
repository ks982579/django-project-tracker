from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import render

from django.contrib.auth.models import User

class Helpers:
    @classmethod
    def send_password_reset_email(cls, user: User):
        """
        Must create Token
        Then a template that takes in Token and resets user's password based on token
        Only renders template if toke IS NOT Expired
        If user requests a new token, delete old one first?
        :param user:
        :return:
        """
        print("In Helpers")
        print(user.email)
        pass