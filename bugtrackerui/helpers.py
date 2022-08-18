from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import render
from django.http import HttpRequest
from django.template import Template, loader

from django.contrib.auth.models import User

# https://pypi.org/project/beautifulsoup4/
from bs4 import BeautifulSoup
import http

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

    @staticmethod
    def soupify(html_package):
        """
        HTML into Text
        It doesn't remove \n or \t inside of message.
        perhaps a custom parser one day?
        :param html_package:
        :return:
        """
        soup = BeautifulSoup(html_package, features="html.parser")
        return soup.get_text()

    @classmethod
    def send_password_reset_email(cls, user: User, request: HttpRequest):
        """
        Must create Token
        Then a template that takes in Token and resets user's password based on token
        Only renders template if toke IS NOT Expired
        If user requests a new token, delete old one first?


        :param user:
        :return:
        """
        #print("In Helpers")
        token_obj = cls.token_refresh(user)
        #print(token_obj)
        email_context = {
            "username": user.username,
            "token": str(token_obj.password_token),
        }
        # https://docs.djangoproject.com/en/4.1/intro/tutorial03/
        # https://docs.djangoproject.com/en/4.1/ref/templates/api/#django.template.Template
        # https://docs.djangoproject.com/en/4.1/topics/templates/
        html_template = loader.get_template("bugtrackerui/forgot_password_email.html") # Returns template object
        html_message = html_template.render(email_context)
        #print(html_message)
        subject = "KSullDev Project Tracker - Forgotten Password"
        sender = settings.EMAIL_HOST_USER
        receiver = [user.email]
        # email_status = send_mail(subject=subject,
        #           message= cls.soupify(html_message),
        #           from_email=sender,
        #           recipient_list=receiver,
        #           html_message=html_message)
        # print(email_status)
        return 0