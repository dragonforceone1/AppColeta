from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from tastypie.authentication import ApiKeyAuthentication

from .Respostas import *
from ..serializers import UsuarioSerializer


class Requisicao(generics.ListCreateAPIView):
    serializer_class = UsuarioSerializer
    permission_classes = (AllowAny,)

    def get(self, request):
        authentication = ApiKeyAuthentication()
        if authentication.is_authenticated(request) is not True:
            return Response(Respostas.NAO_AUTORIZADO.value)


class RequisicaoAlterar(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UsuarioSerializer
    permission_classes = (AllowAny,)

    def get(self, request):
        authentication = ApiKeyAuthentication()
        if authentication.is_authenticated(request) is not True:
            return Response(Respostas.NAO_AUTORIZADO.value)
