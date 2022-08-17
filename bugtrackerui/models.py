from django.db import models
from django.contrib.auth.models import User
from uuid import uuid4

# Create your models here.
class PasswordResetModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    password_token_created = models.DateTimeField(auto_now_add=True)
    password_token = models.UUIDField(unique=True, editable=False, default=uuid4)

    def __str__(self):
        return str(self.password_token)
