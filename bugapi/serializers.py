from rest_framework import serializers
from .models import TaskModel, MessagesModel
from django.contrib.auth.models import User

# Create Serializers
class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessagesModel
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskModel
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email']