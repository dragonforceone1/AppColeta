from django.db import models

class Locais(models.Model):
    cidade = models.CharField(max_length=45)
    logradouro = models.CharField(max_length=45)
    numero = models.IntegerField()
    latitude = models.DecimalField(max_digits=18, decimal_places=10, null=True)
    longitude = models.DecimalField(max_digits=18, decimal_places=10, null=True)
    rotulo = models.CharField(max_length=100)
    tipo = models.IntegerField()

    def __str__(self):
        return self.rotulo

class Gerenciamento(models.Model):
    Local_id = models.ForeignKey(Locais, on_delete=models.CASCADE)
    diaSemana = models.IntegerField()
    turno = models.IntegerField()

    def __str__(self):
        # + ' - ' + self.dia + '/' + self.turno
        return self.Local_id.rotulo
