from django.urls import path, include
from .views import ProjectViewGetAllClass, ProjectViewCreateClass, ProjectViewUpdateClass, ProjectViewDestroyClass, ProjectViewGetOwnershipClass, AuthenticateUser, GetUserInfo, TaskHandler
from rest_framework.authtoken.views import obtain_auth_token

# Git note
urlpatterns = [
    path('', ProjectViewGetAllClass.as_view(), name="project-list-all-view"),
    path('what-i-own/', ProjectViewGetOwnershipClass.as_view(), name="project-list-ownership-view"),
    #path('working-on-all/', ProjectViewGetOwnershipClass.as_view(), name="project-list-ownership-view"),
    path('create/', ProjectViewCreateClass.as_view(), name="project-create-view"),
    path('update/<int:pk>/', ProjectViewUpdateClass.as_view(), name="project-update-view"),
    path('destroy/<int:pk>/', ProjectViewDestroyClass.as_view(), name="project-destroy-view"),
    #path('auth/', obtain_auth_token, name="token-gen"), #For Desktop Applications
    path('auth/', AuthenticateUser.as_view()),
    path('current-user/', GetUserInfo.as_view()),
    path('task-handler/',TaskHandler.as_view()),
]