from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from base.models import Llavero, Estudiante
from base.serializers import LlaveroSerializer
from rest_framework import status

import serial, time


def arduino():
    port = serial.Serial('COM3', 9600, timeout=1)
    time.sleep(2)
    c = 0
    hexa = []
    while True:
        read = port.readline()
        c += 1
        if c == 4:
            valor = read.strip()
            # b'C3C06C0C' -> C3C06C0C
            convert = valor.decode('utf-8')
            hexa = str(convert)
            print(hexa)
        if c == 5:
            break
    port.close()
    return hexa


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createLlavero(request):    
    try:
        estudiante = Estudiante.objects.get(user=request.user)
        llavero = Llavero.objects.create(
            tag=arduino(),
            tag_status=False,
            estudiante=estudiante,
        )
        serializer = LlaveroSerializer(llavero, many=False)
        if llavero.tag != '':
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'No se pudo crear el llavero'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        message = {'detail': 'Este Llavero ya existe'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
