# Generated by Django 4.1.1 on 2022-10-09 21:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_rename_llavero_llavero_tag_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='llavero',
            name='updatedAt',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
