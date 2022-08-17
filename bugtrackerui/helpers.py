from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import render

from django.contrib.auth.models import User
from .models import *

class Helpers:
    @classmethod
    def token_refresh(cls, user: User):
        """
        delete an old token if it exists so we can create a new one.
        :param user:
        :return PasswordResetModel object:

        Model.objects.get_or_create() didn't work because of timestamp.
        """
        try:
            old_token = PasswordResetModel.objects.get(user=user)
            old_token.delete()
        except PasswordResetModel.DoesNotExist as DNE:
            print(DNE)
            pass
        new_token = PasswordResetModel.objects.create(user=user)
        return new_token

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
        token_obj = cls.token_refresh(user)
        return 0