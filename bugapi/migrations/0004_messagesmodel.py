# Generated by Django 4.0.5 on 2022-07-23 15:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.db.models.expressions


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bugapi', '0003_alter_taskmodel_developers'),
    ]

    operations = [
        migrations.CreateModel(
            name='MessagesModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sent_date', models.DateTimeField(auto_now_add=True)),
                ('subject', models.CharField(max_length=255)),
                ('body', models.TextField()),
                ('cc_users', models.ManyToManyField(blank=True, null=True, related_name='cc_set', to=settings.AUTH_USER_MODEL)),
                ('from_user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='from_set', to=settings.AUTH_USER_MODEL)),
                ('to_users', models.ManyToManyField(related_name='to_set', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': [django.db.models.expressions.OrderBy(django.db.models.expressions.F('sent_date'), descending=True)],
            },
        ),
    ]