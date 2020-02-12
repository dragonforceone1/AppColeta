from django.db import models

from .estado import Estado


class Municipio(models.Model):
    """ Classe de Municipio """

    class Meta:
        db_table = 'Municipio'

    def __str__(self):
        return self.nome

    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=50)
    Estado = models.ForeignKey(Estado, on_delete=models.CASCADE)
