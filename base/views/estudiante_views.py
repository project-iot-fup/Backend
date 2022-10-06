import serial
import time

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import *
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
        if c == 5:  # en 5 pasos de al lectura del aurduino para el cilo de la lectura
            # arduino.close()
            break
    arduino.close()
    return hexa



@api_view(['GET'])
@permission_classes([IsAdminUser, IsAuthenticated])
def getEstudiantes(request):
    estudiantes = Estudiante.objects.all()
    serializer = EstudianteSerializer(estudiantes, many=True)
    return Response(serializer.data)


@api_view(['POST'])
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
        return Response(serializer.data)
    except:
        message = {'detail': 'Este estudiante ya existe'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


