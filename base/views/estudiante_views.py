from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Estudiante
from base.serializers import EstudianteSerializer
from rest_framework import status


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
    try:
        estudiante = Estudiante.objects.get(_id=pk)
        serializer = EstudianteSerializer(estudiante, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        message = {'detail': 'No se encontro el estudiante'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


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
        )

        serializer = EstudianteSerializer(estudiante, many=False)        
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        message = {'detail': 'Este estudiante ya existe'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateEstudiante(request, pk):
    try:
        data = request.data
        estudiante = Estudiante.objects.get(_id=pk)
        estudiante.nombre = data['nombre']
        estudiante.apellido = data['apellido']
        estudiante.materias = data['materias']

        estudiante.save()

        serializer = EstudianteSerializer(estudiante, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        print('error')
        message = {'detail': 'Se produjo un error al actualizar el estudiante'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteEstudiante(pk):
    try:
        estudiante = Estudiante.objects.get(_id=pk)
        estudiante.delete()
        message = {'detail': 'Estudiante eliminado exitosamente'}
        return Response(message, status=status.HTTP_200_OK)
    except:
        message = {'detail': 'Se produjo un error al eliminar el estudiante'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
