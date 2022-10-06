# Generated by Django 4.1.1 on 2022-10-06 22:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_profesor_delete_categories_delete_editorials_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Materia',
            fields=[
                ('nombre', models.CharField(max_length=50)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('profesor', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.profesor')),
            ],
        ),
    ]