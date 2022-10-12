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
    read = port.readline()
    hexa = read.decode('utf-8')
    port.close()
    return hexa
        

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createLlavero(request):
    try:
        code = arduino()
        if Llavero.objects.filter(tag=code).exists(): 
            message = 'Llavero ya existe'
            print(message)
            return Response({'message': message}, status=status.HTTP_400_BAD_REQUEST)
       
        if code == '':
            message = 'No se encontro llavero'
            print(message)
            return Response({'message': message}, status=status.HTTP_400_BAD_REQUEST)
        else:
            estudiante = Estudiante.objects.get(user=request.user)
            llavero = Llavero.objects.create(
                tag=code,
                tag_status=False,
                estudiante=estudiante,
            )
            serializer = LlaveroSerializer(llavero, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)

    except:
        message = {'detail': 'No se logro crear el llavero'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET'])
def estudianteLlavero(request, pk):
    try:
        llavero = Llavero.objects.filter(estudiante=pk)
        serializer = LlaveroSerializer(llavero, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        message = {'detail': 'No se encontraron llaveros'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

