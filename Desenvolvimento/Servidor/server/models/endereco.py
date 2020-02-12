from django.db import models

from .municipio import Municipio
from .usuario import Usuario


class Endereco(models.Model):
    """ Classe de endereço. """

    class Meta:
        db_table = 'Endereco'

    def __str__(self):
        return self.logradouro

    Usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    logradouro = models.CharField(max_length=80,blank=True,null=True)
    bairro = models.CharField(max_length=50,blank=True,null=True)
    numero = models.IntegerField(blank=True)
    Municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE)
    visibilidadeMunicipio = models.IntegerField(default=0)
    visibilidadeEstado = models.IntegerField(default=0)
    visibilidadePais = models.IntegerField(default=0)

# TODO: o field parece não ser necessário...
# class EnderecoField(models.Field):
#     """ Classe de endereço. """

#     class Meta:
#         db_table = 'Endereco'

#     def deconstruct(self):
#         name, path, args, kwargs = super().deconstruct()
#         del kwargs["max_length"]
#         return name, path, args, kwargs

#     logradouro = models.CharField(max_length=80)
#     numero = models.IntegerField()
#     bairro = models.CharField(max_length=50)
#     visibilidadeMunicipio = models.IntegerField(default=0)
#     visibilidadeEstado = models.IntegerField(default=0)
#     visibilidadePais = models.IntegerField(default=0)
