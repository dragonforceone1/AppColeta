from django.db import models

class Rota(models.Model):
    """ Classe do Rota """

    class Meta:
        db_table = 'Rota'

    def __str__(self):
        return self.nome

    # Campos especificados
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=200)