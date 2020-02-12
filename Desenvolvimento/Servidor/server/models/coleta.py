# -*- coding: utf-8 -*-
from django.db import models
from .local import Local

class Coleta(models.Model):
    """ Classe do Coleta """

    class Meta:
        db_table = 'Coleta'

    def __str__(self):
        return str(self.Local_id.rotulo)

    # Campos especificados
    id = models.AutoField(primary_key=True)
    diaSemana = models.IntegerField()
    turno = models.IntegerField()
    Local_id = models.ForeignKey(Local, on_delete=models.CASCADE)