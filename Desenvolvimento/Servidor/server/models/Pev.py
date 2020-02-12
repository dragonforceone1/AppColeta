from django.db import models
from .local import Local

class Pev(models.Model):
    """ Classe do Pev """

    class Meta:
        db_table = 'Pev'

    def __str__(self):
        return str(self.Local_id.rotulo)

    # Campos especificados
    id = models.AutoField(primary_key=True)
    Local_id = models.ForeignKey(Local, on_delete=models.CASCADE)
    horarioFuncionamento = models.CharField(max_length=15)
    diasFuncionamento = models.CharField(max_length=40)