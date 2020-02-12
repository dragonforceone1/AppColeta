from django.db import models

from .pais import Pais


class Estado(models.Model):
    """ Classe de Estado """

    class Meta:
        db_table = 'Estado'

    def __str__(self):
        return self.nome

    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=50)
    sigla = models.CharField(max_length=2)
    Pais = models.ForeignKey(Pais, on_delete=models.CASCADE)
