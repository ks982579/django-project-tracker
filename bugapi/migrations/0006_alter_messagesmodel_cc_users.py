# Generated by Django 4.0.5 on 2022-07-23 15:48

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bugapi', '0005_alter_messagesmodel_cc_users'),
    ]

    operations = [
        migrations.AlterField(
            model_name='messagesmodel',
            name='cc_users',
            field=models.ManyToManyField(blank=True, related_name='cc_set', to=settings.AUTH_USER_MODEL),
        ),
    ]
