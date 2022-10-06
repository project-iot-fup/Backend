from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Profesor(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    nombre = models.CharField(User.first_name, max_length=50)
    apellido = models.CharField(User.last_name, max_length=50)
    cedula = models.CharField(max_length=50)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.nombre


class Materia(models.Model):
    nombre = models.CharField(max_length=50)
    profesor = models.ForeignKey(
        Profesor, on_delete=models.SET_NULL, null=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.nombre


class Estudiante(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    nombre = models.CharField(User.first_name, max_length=50)
    apellido = models.CharField(User.last_name, max_length=50)
    cedula = models.CharField(max_length=50)
    materias = models.ForeignKey(Materia, on_delete=models.SET_NULL, null=True)
    # Codigo HEX desde el Arduino
    llavero = models.CharField(max_length=45, unique=True)
    llavero_status = models.BooleanField(default=False)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.nombre


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
        Profesor, on_delete=models.SET_NULL, null=True)
    estudiantes = models.ForeignKey(
        Estudiante, on_delete=models.SET_NULL, null=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.numero


class Asistencia(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    sala = models.ForeignKey(Sala, on_delete=models.SET_NULL, null=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.estudiante.nombre


class Reporte(models.Model):
    asistencia = models.OneToOneField(
        Asistencia, on_delete=models.CASCADE, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self._id
