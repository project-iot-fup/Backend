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
    nombre = models.CharField(max_length=50)
    profesor = models.ForeignKey(
        Profesores, on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.nombre


class Estudiante(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    nombre = models.CharField(max_length=200, null=True, blank=True)
    apellido = models.CharField(max_length=200, null=True, blank=True)
    cedula = models.CharField(max_length=50)
    materias = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.nombre


class Llavero(models.Model):
    llavero = models.CharField(max_length=50)
    llavero_status = models.BooleanField(default=False)
    estudiante = models.ForeignKey(
        Estudiante, on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.estudiante.nombre + " " + self.llavero


class Sala(models.Model):

    sedes = (
        ('Sede San Camilo', 'Sede San Camilo'),
        ('Sede San Jose', 'Sede San Jose'),
    )

    numero = models.CharField(max_length=50)
    materia = models.ForeignKey(Materia, on_delete=models.SET_NULL, null=True)
    sede = models.CharField(max_length=50, choices=sedes,
                            default='Sede San Jose')
    profesor = models.ForeignKey(
        Profesores, on_delete=models.SET_NULL, null=True)
    estudiantes = models.ForeignKey(
        Estudiante, on_delete=models.SET_NULL, null=True)
    fecha_inicio = models.DateTimeField(auto_now_add=True)
    fecha_fin = models.DateTimeField(auto_now_add=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.numero


class Asistencia(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    sala = models.ForeignKey(Sala, on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.estudiante.nombre


class Reporte(models.Model):
    asistencia = models.OneToOneField(
        Asistencia, on_delete=models.CASCADE, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self._id
