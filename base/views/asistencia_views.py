from base.models import Sala
from base.serializers import SalaSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def getAsistencias(request):
    salas = Sala.objects.all()
    serializer = SalaSerializer(salas, many=True)
    return Response({'salas': serializer.data})
    
@api_view(['GET'])
def getAsistencia(request, pk):
    sala = Sala.objects.get(_id=pk)
    serializer = SalaSerializer(sala, many=False)
    return Response(serializer.data)


