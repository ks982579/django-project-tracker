from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import render
from django.http import HttpRequest
from django.template import Template, loader

from django.contrib.auth.models import User

# https://pypi.org/project/beautifulsoup4/
from bs4 import BeautifulSoup
from html.parser import HTMLParser

from .models import *


class CustomHTMLParser(HTMLParser):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__prepend = {}
        self.__postpend = {}
        self.__message = []

    def convert(self, html: str):
        html_string = ''
        for each_line in html.split('\n'):
            each_line = each_line.strip('\t\n ')
            html_string += each_line
        print(html_string)
        return self.feed(html_string)

    def handle_starttag(self, tag: str, attrs: list) -> None:
        # if we have a prepend rule, append to message
        if self.__prepend.get(tag, None) != None:
            self.__message.append(self.__prepend.get(tag))

    def handle_data(self, data: str) -> None:
        self.__message.append(data)

    def handle_endtag(self, tag: str) -> None:
        # if we have a prepend rule, append to message
        if self.__postpend.get(tag, None) != None:
            self.__message.append(self.__postpend.get(tag))

    def handle_startendtag(self, tag: str, attrs: list) -> None:
        if tag == 'br':
            self.__message.append('\n')

    def add_prepend_rule(self, tag: str, rule: str):
        try:
            self.__prepend[tag] = rule
        except Exception as error:
            print(f'Could not add rule: {error}')

    def add_postpend_rule(self, tag: str, rule: str):
        try:
            self.__postpend[tag] = rule
        except Exception as error:
            print(f'Could not add rule: {error}')

    @property
    def message(self):
        for efk in self.__message:
            print(efk)
        return ''.join(self.__message)


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
            old_token = PasswordResetModel.tokens.get(user=user)
            old_token.delete()
        except PasswordResetModel.DoesNotExist as DNE:
            print(DNE)
            pass
        new_token = PasswordResetModel.tokens.create(user=user)
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
        email_status = send_mail(subject=subject,
                  message= cls.soupify(html_message),
                  from_email=sender,
                  recipient_list=receiver,
                  html_message=html_message)
        print(email_status)
        return 0