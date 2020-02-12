from django.db import models


class Pais(models.Model):
    """ Classe de Pais """

    class Meta:
        db_table = 'Pais'

        # Corrige typo na página de admin: django já colocar plural automaticamente
        verbose_name_plural = 'Pais'

    def __str__(self):
        return self.nome

    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=50)
    sigla = models.CharField(max_length=3)
