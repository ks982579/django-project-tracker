# Generated by Django 4.0.5 on 2022-06-16 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bugapi', '0009_alter_taskmodel_parent_project_and_more'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='taskmodel',
            constraint=models.CheckConstraint(check=models.Q(models.Q(('parent_project__isnull', True), ('parent_task__isnull', False)), models.Q(('parent_project__isnull', False), ('parent_task__isnull', True)), _connector='OR'), name='bugapi_taskmodel_parent_project_or_parent_task'),
        ),
    ]