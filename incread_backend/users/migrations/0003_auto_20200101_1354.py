# Generated by Django 2.2.5 on 2020-01-01 08:24

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20191231_1733'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userarticle',
            name='priority',
            field=models.IntegerField(null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)]),
        ),
    ]
