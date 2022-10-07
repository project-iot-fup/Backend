from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Estudiante
from base.serializers import *
from rest_framework import status

import serial, time


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
        c += 1
        if c == 4:
            valor = sarduino.strip()
            hexa = str(valor).split(":  ")
            hexa = hexa[1].replace("'", "")
        if c == 5:
            break
    arduino.close()
    return hexa


@api_view(['GET'])
def getEstudiantes(request):
    try:
        estudiantes = Estudiante.objects.order_by('-createdAt')
        serializer = EstudianteSerializer(estudiantes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        message = {'detail': 'No se encontraron estudiantes'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getEstudiante(request, pk):
    estudiante = Estudiante.objects.get(_id=pk)
    serializer = EstudianteSerializer(estudiante, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser, IsAuthenticated])
def createEstudiante(request):
    try:
        user = request.user
        estudiante = Estudiante.objects.create(
            user=user,
            nombre='',
            apellido='',
            cedula='',
            materias='',
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
    try:
        test = arduino()
        data = request.data
        estudiante = Estudiante.objects.get(_id=pk)
        estudiante.nombre = data['nombre']
        estudiante.apellido = data['apellido']
        estudiante.materias = data['materias']
        estudiante.llavero = test

        estudiante.save()

        serializer = EstudianteSerializer(estudiante, many=False)
        print('success')
        message = {'detail': 'Estudiante actualizado exitosamente'}
        return Response(message, serializer.data, status=status.HTTP_200_OK)
    except:
        print('error')
        message = {'detail': 'Se produjo un error al actualizar el estudiante'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteEstudiante(request, pk):
    estudiante = Estudiante.objects.get(_id=pk)
    estudiante.delete()
    return Response('Estudiante eliminado')
