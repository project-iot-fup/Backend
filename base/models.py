from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Profesores(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    nombre = models.CharField(max_length=200, null=True, blank=True)
    apellido = models.CharField(max_length=200, null=True, blank=True)
    cedula = models.CharField(max_length=50)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.nombre


class Materia(models.Model):

    tipos = (
        ('Nocturna', 'Nocturna'),
        ('Diurna', 'Diurna'),
    )

    nombre = models.CharField(max_length=50)
    jornada = models.CharField(max_length=50, choices=tipos, default='Diurna')
    profesor = models.ForeignKey(
        Profesores, on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.nombre


class Estudiante(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    photo = models.ImageField(null=True, blank=True)
    nombre = models.CharField(max_length=200, null=True, blank=True)
    apellido = models.CharField(max_length=200, null=True, blank=True)
    cedula = models.CharField(max_length=50, null=True, blank=True)
    materia = models.ForeignKey(
        Materia, on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.nombre


# product
class Sala(models.Model):

    sedes = (
        ('Sede San Camilo', 'Sede San Camilo'),
        ('Sede San Jose', 'Sede San Jose'),
    )

    numero = models.CharField(max_length=50)
    materia = models.ForeignKey(Materia, on_delete=models.SET_NULL, null=True)
    sede = models.CharField(max_length=50, choices=sedes,
                            default='Sede San Jose')
    fecha_inicio = models.DateTimeField(editable=True)
    fecha_fin = models.DateTimeField(editable=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.numero
    

class Llavero(models.Model):
    tag = models.CharField(max_length=50)
    tag_status = models.BooleanField(default=False)
    estudiante = models.ForeignKey(
        Estudiante, on_delete=models.SET_NULL, null=True)
    updatedAt = models.DateTimeField(auto_now=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.tag
    

class Asistencia(models.Model):
    sala = models.ForeignKey(Sala, on_delete=models.SET_NULL, null=True)
    llavero = models.ForeignKey(
        Llavero, on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.sala)
    
    

