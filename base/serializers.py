from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from base.models import Profesores, Materia, Estudiante, Llavero, Sala, Asistencia


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ProfesoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesores
        fields = '__all__'


class MateriaSerializer(serializers.ModelSerializer):

    
    class Meta:
        model = Materia
        fields = '__all__'
        
        

class EstudianteSerializer(serializers.ModelSerializer):
    materia = MateriaSerializer(many=False)
    class Meta:
        model = Estudiante
        fields = '__all__'
        
    def get_materia(self, obj):
        materia = obj.materia
        serializer = MateriaSerializer(materia, many=False)
        return serializer.data


class LlaveroSerializer(serializers.ModelSerializer):
    estudiante = EstudianteSerializer(many=False)
    class Meta:
        model = Llavero
        fields = '__all__'

    def get_estudiante(self, obj):
        estudiante = obj.estudiante
        serializer = EstudianteSerializer(estudiante, many=False)
        return serializer.data
    
    
class AsistenciaSerializer(serializers.ModelSerializer):
    llavero = LlaveroSerializer(many=False)
    class Meta:
        model = Asistencia
        fields = '__all__'
        
        
    def get_llavero(self, obj):
        llavero = obj.llavero
        serializer = LlaveroSerializer(llavero, many=False)
        return serializer.data

class SalaSerializer(serializers.ModelSerializer):
    materia = MateriaSerializer(many=False)
    asistencia = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Sala
        fields = '__all__'
        
    def get_materia(self, obj):
        materia = obj.materia
        serializer = MateriaSerializer(materia, many=False)
        return serializer.data
        
    def get_asistencia(self, obj):
        asistencia = obj.asistencia_set.all()
        serializer = AsistenciaSerializer(asistencia, many=True)
        return serializer.data

    
        

        

        


        


