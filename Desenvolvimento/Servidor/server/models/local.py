from django.db import models

class Local(models.Model):
    """ Classe do Local """

    class Meta:
        db_table = 'Local'

    def __str__(self):
        return self.rotulo

    # Campos especificados
    id = models.AutoField(primary_key=True)
    rotulo = models.CharField(max_length=200, unique=True)
    longitude = models.FloatField()
    latitude = models.FloatField()
    tipoLocal = models.IntegerField()
    logradouro = models.CharField(max_length=100)
    numero = models.IntegerField()
    cidade = models.CharField(max_length=45)
