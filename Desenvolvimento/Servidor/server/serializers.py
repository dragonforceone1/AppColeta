from rest_framework import serializers

from .models.endereco import Endereco
from .models.estado import Estado
from .models.municipio import Municipio
from .models.pais import Pais
from .models.usuario import Usuario

from .models.coleta import Coleta
from .models.local import Local
from .models.rota import Rota
from .models.rota_has_local import Rota_has_Local
from .models.associacao import Associacao
from .models.unidade import Unidade
from .models.Pev import Pev

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        # fields = '__all__'
        exclude = ('senha', 'tokenFacebook', 'tokenGoogle')

class UsuarioPesquisadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        # fields = '__all__'
        exclude = ('senha','cpf', 'tokenFacebook', 'tokenGoogle')


class ExibirUsuarioPublico(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id', 'nome')


class ExibirUsuarioRestrito(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id', 'nome')


class ExibirUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id', 'nome')


class UsuarioNovaSenha(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id', 'senha')


class UsuarioNovoTipo(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id', 'tipoUsuario')


class UsuarioLogin(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('email', 'senha')


class UsuarioPesquisa(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id', 'nome', 'imagem')


class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = ('logradouro', 'numero', 'bairro')


class EnderecoPesqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        exclude = ('logradouro', 'numero', 'bairro')


class MunicipioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipio
        fields = ('id', 'nome')


class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = ('id', 'nome', 'sigla')


class PaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pais
        fields = ('id', 'nome', 'sigla')

class ColetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coleta
        fields = '__all__'

class LocalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Local
        fields = '__all__'

class RotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rota
        fields = '__all__'

class RLSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rota_has_Local
        fields = '__all__'

class AssociacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Associacao
        fields = '__all__'

class UnidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unidade
        exclude = ('Local_id', 'Associacao_id')

class LevSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pev
        fields = '__all__'
