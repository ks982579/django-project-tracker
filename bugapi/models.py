from django.db import models
from django.contrib.auth.models import User

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