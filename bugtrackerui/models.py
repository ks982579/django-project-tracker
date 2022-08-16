from django.db import models
from django.contrib.auth.models import User
from uuid import uuid4

# Create your models here.
class PasswordResetModel(User):
    created = models.DateTimeField(auto_now_add=True)
    token = models.UUIDField(unique=True, editable=False, default=uuid4)
