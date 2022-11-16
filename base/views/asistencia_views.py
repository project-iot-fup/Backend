from base.models import Sala
from base.serializers import SalaSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def getAsistencias(request):
    asistencias = Sala.objects.all()
    serializer = SalaSerializer(asistencias, many=True)
    return Response(serializer.data)
    
@api_view(['GET'])
def getAsistencia(request, pk):
    sala = Sala.objects.get(_id=pk)
    serializer = SalaSerializer(sala, many=False)
    return Response(serializer.data)


