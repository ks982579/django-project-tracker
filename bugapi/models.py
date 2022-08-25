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

class MessagesModel(models.Model):
    sent_date = models.DateTimeField(auto_now_add=True) #when sent
    from_user = models.ForeignKey(User, related_name='from_set', on_delete=models.PROTECT) #Can't be blank

    # To and CC will require 'limit_choices_to' property
    # https://docs.djangoproject.com/en/4.0/ref/models/fields/#django.db.models.ForeignKey.limit_choices_to
    # https://docs.djangoproject.com/en/4.0/topics/db/queries/#complex-lookups-with-q
    send_to = models.ManyToManyField(User, related_name='to_set') #Can't be blank
    # ['__call__', '__class__', '__class_getitem__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__slotnames__', '__str__', '__subclasshook__', '__weakref__', '_add_items', '_apply_rel_filters', '_build_remove_filters', '_constructor_args', '_create_user', '_db', '_get_add_plan', '_get_missing_target_ids', '_get_queryset_methods', '_get_target_ids', '_hints', '_insert', '_queryset_class', '_remove_items', '_remove_prefetched_objects', '_set_creation_counter', '_update', 'add', 'aggregate', 'alias', 'all', 'annotate', 'auto_created', 'bulk_create', 'bulk_update', 'check', 'clear', 'complex_filter', 'contains', 'contribute_to_class', 'core_filters', 'count', 'create', 'create_superuser', 'create_user', 'creation_counter', 'dates', 'datetimes', 'db', 'db_manager', 'deconstruct', 'defer', 'difference', 'distinct', 'do_not_call_in_templates', 'earliest', 'exclude', 'exists', 'explain', 'extra', 'filter', 'first', 'from_queryset', 'get', 'get_by_natural_key', 'get_or_create', 'get_prefetch_queryset', 'get_queryset', 'in_bulk', 'instance', 'intersection', 'iterator', 'last', 'latest', 'make_random_password', 'model', 'name', 'none', 'normalize_email', 'only', 'order_by', 'pk_field_names', 'prefetch_cache_name', 'prefetch_related', 'query_field_name', 'raw', 'related_val', 'remove', 'reverse', 'select_for_update', 'select_related', 'set', 'source_field', 'source_field_name', 'symmetrical', 'target_field', 'target_field_name', 'through', 'union', 'update', 'update_or_create', 'use_in_migrations', 'using', 'values', 'values_list', 'with_perm']
    cc_to = models.ManyToManyField(User, related_name='cc_set', blank=True)
    subject = models.CharField(max_length=255, blank=False)
    body = models.TextField(blank=False)

    def __str__(self):
        to_users = ''
        for _eu in self.send_to.all():
            if to_users == '':
                to_users = f'{_eu.username}'
            else:
                to_users += f', {_eu.username}'
        return f'from: {self.from_user}\nto: {to_users}\nsubject: {self.subject}'

    class Meta:
        # https://docs.djangoproject.com/en/4.0/ref/models/expressions/#f-expressions
        ordering = [F('sent_date').desc()]

class SudoUserModel(models.Model):
    """
    Each user *should have SudoUser entry.
    This will store other information like Messages and Team Members
    """
    # The user
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='real_user')
    # Messages
    inbox = models.ManyToManyField(MessagesModel, related_name='inbox', blank=True)
    outbox = models.ManyToManyField(MessagesModel, related_name='outbox', blank=True)
    draftbox = models.ManyToManyField(MessagesModel, related_name='draftbox', blank=True)
    # Team Members
    team_members = models.ManyToManyField(User, related_name='team_members', blank=True)
    requested_by = models.ManyToManyField(User, related_name='requested_by_set', blank=True)
    requesting = models.ManyToManyField(User, related_name='requesting_set', blank=True)

    def __str__(self):
        return f'SudoUser: {self.user.username}'

# Do I need a TeamMemberRequest Table to track requests?
class MemberRequestModel(models.Model):
    sent_by = models.OneToOneField(User, on_delete=models.CASCADE, related_name='sent_by_set')
    sent_to = models.OneToOneField(User, on_delete=models.CASCADE, related_name='sent_to_set')
    accepted = models.BooleanField(default=False)
    rejected = models.BooleanField(default=False)