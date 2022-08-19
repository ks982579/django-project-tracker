from django.db import models
from django.contrib.auth.models import User
from uuid import uuid4
from datetime import timedelta, datetime

# Create your models here.
class PasswordResetModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    password_token_created = models.DateTimeField(auto_now_add=True)
    password_token = models.UUIDField(unique=True, editable=False, default=uuid4)

    tokens = models.Manager()

    def is_valid(self):
        print(type(self.password_token_created))
        print(self.password_token_created)
        expiry = self.password_token_created + timedelta(days=0, minutes=15)
        print(expiry)
        print(expiry.tzinfo)
        # https://www.jquery-az.com/python-datetime-now/
        #print(datetime.utcnow())
        #help(self.password_token_created)
        # print(datetime.now(tz=expiry.tzinfo))
        return datetime.now(tz=expiry.tzinfo) < expiry

    def __str__(self):
        user_string = str(self.user)
        uuid_string = str(self.password_token)
        return str(user_string + " || " + uuid_string)
