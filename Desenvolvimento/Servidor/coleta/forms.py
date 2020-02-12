from django.forms import ModelForm
from server.models.coleta import Coleta
from server.models.local import Local
from server.models.Pev import Pev
from server.models.associacao import Associacao
from server.models.unidade import Unidade

class LocalForm(ModelForm):
    class Meta:
        model = Local
        fields = ['cidade',
                  'logradouro',
                  'numero',
                  'latitude',
                  'longitude',
                  'rotulo',
                  'tipoLocal']

class PesquisaLocalForm(ModelForm):
    class Meta:
        model = Local
        fields = ['cidade',
                  'logradouro',
                  'numero',
                  'rotulo',
                  'tipoLocal']

class GerenciaForm(ModelForm):
    class Meta:
        model = Coleta
        fields = ['Local_id',
                  'diaSemana',
                  'turno']

class PevForm(ModelForm):
    class Meta:
        model = Pev
        fields = ['diasFuncionamento',
                  'horarioFuncionamento',
                  'Local_id']

class AssForm(ModelForm):
    class Meta:
        model = Associacao
        fields = ['nome',
                  'logo',
                  'cnpj',
                  'anoFundacao',
                  'descricao',
                  'fotoCatadores']

class UnidForm(ModelForm):
    class Meta:
        model = Unidade
        fields = ['Local_id',
                  'Associacao_id',
                  'sede',
                  'horarioFuncionamento',
                  'quantidadeCatadores',
                  'diasFuncionamento']
