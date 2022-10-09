from django.urls import path
from base.views import llavero_views as views


urlpatterns = [
    path('create/', views.createLlavero, name="llavero-create"),
    path('<str:pk>/', views.estudianteLlavero, name="llavero-estudiante"),
]
