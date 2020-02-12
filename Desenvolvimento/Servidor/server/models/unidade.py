from django.db import models
from .local import Local
from .associacao import Associacao

class Unidade(models.Model):
    """ Classe da Unidade """

    class Meta:
        db_table = 'Unidade'

    def __str__(self):
        return str(self.Local_id.rotulo)

    # Campos especificados
    id = models.AutoField(primary_key=True)
    Local_id = models.ForeignKey(Local, on_delete=models.CASCADE)
    Associacao_id = models.ForeignKey(Associacao, on_delete=models.CASCADE)
    horarioFuncionamento = models.CharField(max_length=15)
    quantidadeCatadores = models.IntegerField(default=0)
    diasFuncionamento = models.CharField(max_length=40)
    sede = models.BooleanField()