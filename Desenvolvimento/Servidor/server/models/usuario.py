# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models
from tastypie.models import create_api_key

# Imports dos programadores
models.signals.post_save.connect(create_api_key, sender=User)


class Usuario(models.Model):
    """ Classe do Usuario """

    class Meta:
        db_table = 'Usuario'

    def __str__(self):
        return self.nome

    # Campos especificados
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=50)
    cpf = models.CharField(max_length=11, unique=True,blank=True, null=True)
    email = models.EmailField(max_length=75, unique=True)
    senha = models.CharField(max_length=82)
    telefone = models.CharField(max_length=11, blank=True)
    imagem = models.CharField(max_length=11)
    celular = models.CharField(max_length=11)
    dataNascimento = models.DateField()
    tipoUsuario = models.IntegerField()
    visibilidadeDataNascimento = models.IntegerField(default=0)
    visibilidadeEmail = models.IntegerField(default=0)
    visibilidadeTelefones = models.IntegerField(default=0)
    tokenSenha = models.CharField(max_length=64, unique=False, null=True)
    tokenFacebook = models.CharField(max_length=16, unique=False, null=True)
    tokenGoogle = models.CharField(max_length=21, unique=False, null=True)
