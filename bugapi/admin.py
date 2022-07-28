from django.contrib import admin
from .models import TaskModel, MessagesModel, SudoUserModel

# Register your models here.
admin.site.register(TaskModel)
admin.site.register(MessagesModel)
admin.site.register(SudoUserModel)