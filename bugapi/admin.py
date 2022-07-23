from django.contrib import admin
from .models import TaskModel, MessagesModel

# Register your models here.
admin.site.register(TaskModel)
admin.site.register(MessagesModel)