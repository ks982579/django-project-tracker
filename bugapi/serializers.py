from rest_framework import serializers
from .models import TaskModel, MessagesModel, SudoUserModel
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

class SudoUserSerializer(serializers.ModelSerializer):
    team_members = UserSerializer(many=True)
    requested_by = UserSerializer(many=True)
    requesting = UserSerializer(many=True)
    class Meta:
        model = SudoUserModel
        fields = '__all__'