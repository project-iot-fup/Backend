import serial
import time

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Estudiante
from base.serializers import *
from rest_framework import status


def arduino():
    arduino = serial.Serial('COM3', 9600)
    time.sleep(2)
    rawString = arduino.readline()
    print(rawString)
    c = 0
    hexa = ""
    while True:
        sarduino = arduino.readline()
        print(sarduino.strip())
        #c = input("igrese ::")
        c += 1
        if c == 4:
            valor = sarduino.strip()
            hexa = str(valor).split(":  ")
            hexa = hexa[1].replace("'", "")
        if c == 5:  # en 5 pasos de al lectura del aurduino para el ciclo de la lectura
            break
    arduino.close()
    return hexa


@api_view(['GET'])
def getEstudiantes(request):
    estudiantes = Estudiante.objects.all()
    try:
        serializer = EstudianteSerializer(estudiantes, many=True)
        message = "Estudiantes encontrados"
        return Response(message, serializer.data, status=status.HTTP_200_OK)
    except:
        message = {'detail': 'No se encontraron estudiantes'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def getEstudiante(request, pk):
    estudiante = Estudiante.objects.get(_id=pk)
    serializer = EstudianteSerializer(estudiante, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser, IsAuthenticated])
def createEstudiante(request):
    user = request.user

    try:
        estudiante = Estudiante.objects.create(
            user=user,
            nombre='Nombre',
            apellido='Apellido',
            cedula='Cedula',
            materias=None,
            llavero=arduino(),
            llavero_status=False,
        )

        serializer = EstudianteSerializer(estudiante, many=False)
        message = {'detail': 'Estudiante creado exitosamente'}
        return Response(message, serializer.data, status=status.HTTP_200_OK)
    except:
        message = {'detail': 'Este estudiante ya existe'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateEstudiante(request, pk):
    data = request.data
    estudiante = Estudiante.objects.get(_id=pk)

    estudiante.user = data['user']
    estudiante.nombre = data['nombre']
    estudiante.apellido = data['apellido']
    estudiante.cedula = data['cedula']
    estudiante.materias = data['materias']
    estudiante.llavero = data['llavero']

    estudiante.save()

    serializer = EstudianteSerializer(estudiante, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteEstudiante(request, pk):
    estudiante = Estudiante.objects.get(_id=pk)
    estudiante.delete()
    return Response('Estudiante eliminado')
