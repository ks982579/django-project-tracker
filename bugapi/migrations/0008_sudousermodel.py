# Generated by Django 4.0.5 on 2022-07-28 07:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bugapi', '0007_rename_cc_users_messagesmodel_cc_to_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='SudoUserModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inbox', models.ManyToManyField(blank=True, related_name='inbox', to='bugapi.messagesmodel')),
                ('outbox', models.ManyToManyField(blank=True, related_name='outbox', to='bugapi.messagesmodel')),
                ('team_members', models.ManyToManyField(blank=True, related_name='team_members', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='real_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]