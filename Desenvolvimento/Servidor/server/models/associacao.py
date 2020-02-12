from django.db import models

class Associacao(models.Model):
    """ Classe da Associacao """

    class Meta:
        db_table = 'Associacao'

    def __str__(self):
        return self.nome

    # Campos especificados
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=200)
    logo = models.CharField(max_length=200)
    cnpj = models.CharField(max_length=18)
    anoFundacao = models.DateField()
    descricao = models.TextField()
    fotoCatadores = models.CharField(max_length=200)