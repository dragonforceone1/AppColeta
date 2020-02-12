from django.db import models
from .local import Local
from .rota import Rota

class Rota_has_Local(models.Model):
    """ Classe do Rota_has_Local """

    class Meta:
        db_table = 'Rota_has_Local'

    # Campos especificados
    Rota_id = models.ForeignKey(Rota, on_delete=models.CASCADE)
    Local_id = models.ForeignKey(Local, on_delete=models.CASCADE)