from django.db import models
from django.contrib.auth.models import User
from django.db.models import F, Q

# https://docs.djangoproject.com/en/4.0/ref/models/
"""
import zoneinfo
zoneinfo.available_timezones() -> valid keys for IANA time zones 
zoneinfo.ZoneInfo(key="...")
"""
# Create your models here.
class ProjectModel(models.Model):
    owner = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name="ownership_set")
    developers = models.ManyToManyField(User, related_name="developer_set") # A project can have many developers
    title = models.CharField(max_length=255, blank=False)
    sub_title= models.CharField(max_length=255, blank=True, null=False)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateTimeField(blank=True, null=True)
    percent_complete = models.IntegerField(default=1) # Think bps - 0->10,000 /100 = %

    def __str__(self):
        return f'{self.title} -> {self.sub_title} => Due: {self.end_date}'

    class Meta:
        # Assending by end_date, nulls last.
        ordering = [F('end_date').asc(nulls_last=True)]
        ## Owner must always be a developer, constraint!
        # constraints = [models.CheckConstraint(
        #     name="%(app_label)s_%(class)s_parent_project_or_parent_task",
        #     check=(
        #         Q(parent_project__isnull=True, parent_task__isnull=False)
        #         | Q(parent_project__isnull=False, parent_task__isnull=True)
        #     )
        # )]

# The idea is Projects are tied to users, and tasks to projects
class TaskModel(models.Model):
    # Parent project class, if top Level Task
    developers = models.ManyToManyField(User, related_name="user_task_set")  # A project can have many developers
    parent_project = models.ForeignKey(ProjectModel, on_delete=models.CASCADE, blank=True, null=True, related_name="parent_project_set")
    parent_task = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name="parent_task_set")
    task_name = models.CharField(max_length=255, blank=False)
    description = models.TextField(blank=True, null=False)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateTimeField(blank=True, null=True)
    percent_complete = models.IntegerField(default=1)  # Think bps - 0->10,000 /100 = %

    def __str__(self):
        if self.parent_project is not None:
            my_name = self.parent_project
        else:
            my_name = self.parent_task
        return f'{my_name} -> {self.task_name} => Due: {self.end_date}'

    class Meta:
        # Assending by end_date, nulls last.
        ordering = [F('end_date').asc(nulls_last=True)]

        # https://docs.djangoproject.com/en/4.0/ref/models/options/#django.db.models.Options.constraints
        # https://docs.djangoproject.com/en/4.0/ref/models/constraints/
        # https://adamj.eu/tech/2020/03/25/django-check-constraints-one-field-set/
        # https://docs.djangoproject.com/en/4.0/ref/models/querysets/#django.db.models.Q
        # https://docs.djangoproject.com/en/4.0/topics/db/queries/#complex-lookups-with-q
        # https://stackoverflow.com/questions/46286089/specific-way-of-requiring-one-of-two-fields-in-django-model-definition
        """
        Usual filter() will 'AND' things together. The Q object allows for OR. 
        """
        constraints = [models.CheckConstraint(
            name="%(app_label)s_%(class)s_parent_project_or_parent_task",
            check=(
                Q(parent_project__isnull=True, parent_task__isnull=False)
                | Q(parent_project__isnull=False, parent_task__isnull=True)
            )
        )]