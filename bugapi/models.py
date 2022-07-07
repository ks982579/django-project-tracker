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
class TaskModel(models.Model):
    # Parent project class, if top Level Task
    developers = models.ManyToManyField(User, related_name="user_task_set", blank=True)  # A project can have many developers
    parent_task = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name="parent_task_set")

    task_name = models.CharField(max_length=255, blank=False)
    description = models.TextField(blank=True, null=False)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateTimeField(blank=True, null=True)
    percent_complete = models.IntegerField(default=1)  # Think bps - 0->10,000 /100 = %

    def __str__(self):
        if self.parent_task is not None:
            the_rent = self.parent_task.task_name
            return f'{the_rent} :: {self.task_name} => Due: {self.end_date}'
        return f'{self.task_name} => Due: {self.end_date}'

    class Meta:
        # Assending by end_date, nulls last.
        ordering = [F('end_date').asc(nulls_last=True)]