from django.shortcuts import render

from .controladores.Autenticacoes import *
from .controladores.Requisicoes import *
from .controladores.Respostas import *
from .serializers import *

import json, sys
from geopy import distance

########### COLETA ###########
class CadastrarColeta(Requisicao):
    queryset = Coleta.objects.all()
    @staticmethod
    def post(self, request):
        json_object = json.load(request.data)

        for coleta in json_object:
            nova_coleta = Coleta.objects.create(Local_id=Local.objects.get(rotulo=coleta['local']),
                                                diaSemana=coleta['diaSemana'],
                                                tipoLixo=coleta['tipoLixo'],
                                                turno=coleta['turno'])
            nova_coleta.save()

        return Response(Respostas.OK)

class PesquisarColeta(Requisicao):
    serializer_class = ColetaSerializer
    permission_classes = (AllowAny,)
    @staticmethod
    def post(request):
        coleta = request.data
        
        if 'local' not in coleta:
            local = Local.objects.all()
        else:
            local = Local.objects.filter(rotulo__icontains=coleta['local'])

        lista_coleta = []
        for obj in local:
            print(obj)
            queryset = Coleta.objects.filter(Local_id=obj) 

            for coleta_obj in queryset:
                lista_coleta.append(ColetaSerializer(coleta_obj).data)

        return Response(lista_coleta)

class EditarColeta(RequisicaoAlterar):
    @staticmethod
    def post(request):
        # delete old
        queryset = Coleta.objects.filter(Local_id=Local.objects.get(rotulo=request.data['local']))
        for coleta in queryset:
            coleta.delete()

        # save new
        for coleta in request.data['novo']:
            nova_coleta = Coleta.objects.create(Local_id=Local.objects.get(rotulo=request.data['local']),
                                                diaSemana=coleta['diaSemana'],
                                                tipoLixo=coleta['tipoLixo'],
                                                turno=coleta['turno'])
            nova_coleta.save()

        return Response(Respostas.OK.value)

class ExcluirColeta(RequisicaoAlterar):
    @staticmethod
    def post(request):
        coleta_delete = Coleta.objects.get(id=request.data['id'])
        coleta_delete.delete()

        return Response(Respostas.OK.value)

class ExcluirTodaColeta(RequisicaoAlterar):
    @staticmethod
    def post(request):
        queryset = Coleta.objects.filter(nome__icontains=request.data['local'])  # TODO: melhorar perfomance com filtragem
        
        if not queryset:
            return Response(Respostas.ERRO_DESCONHECIDO.value)

        for coleta_obj in queryset:
            coleta_obj.delete()

########### LOCAL ###########
class CadastrarLocal(Requisicao):
    queryset = Local.objects.all()

    @staticmethod
    def post(self, request):
        novo_local = Local.objects.create(rotulo=request.data['rotulo'],
                                          latitude=request.data['latitude'],
                                          longitude=request.data['longitude'],
                                          tipoLocal=request.data['tipoLocal'])

        novo_local.save()

        return Response(Respostas.OK)

class PesquisarLocal(Requisicao):
    serializer_class = LocalSerializer
    permission_classes = (AllowAny,)

    @staticmethod
    def post(request):
        local = request.data
        
        if 'rotulo' not in local:
            queryset = Local.objects.all()
        else:
            queryset = Local.objects.filter(nome__icontains=local['rotulo'])  # TODO: melhorar perfomance com filtragem
        
        if not queryset:
            return Response(Respostas.ERRO_DESCONHECIDO.value)

        lista_locais = []
        for local_obj in queryset:
            lista_locais.append(LocalSerializer(local_obj).data)

        return Response(lista_locais)

class EditarLocal(RequisicaoAlterar):
    @staticmethod
    def post(request):
        local = Local.objects.get(id=request.data['id'])
        local.rotulo = request.data['rotulo']
        local.latitude = request.data['latitude']
        local.longitude = request.data['longitude']
        local.tipoLocal = request.data['tipoLocal']
        local.save()

        return Response(Respostas.OK.value)

class ExcluirLocal(RequisicaoAlterar):
    @staticmethod
    def post(request):
        local = Local.objects.get(id=request.data['id'])
        local.delete()

        return Response(Respostas.OK.value)

########### ROTA ###########
class CadastrarRota(Requisicao):
    queryset = Local.objects.all()

    @staticmethod
    def post(self, request):
        nova_rota = Rota.objects.create(nome=request.data['rota'])
        nova_rota.save()

        json_object = json.load(request.data['locais'])
        for local in json_object:
            novo = Rota_has_Local.objects.create(Rota_id=nova_rota,
                                                 Local_id=Local.objects.get(id=local['id']))
            novo.save()

        return Response(Respostas.OK)

class PesquisarRota(Requisicao):
    serializer_class = RotaSerializer
    permission_classes = (AllowAny,)

    @staticmethod
    def post(request):
        rota = request.data

        if 'nome' not in rota:
            queryset = Rota.objects.all()
        else:
            queryset = Rota.objects.filter(nome__icontains=rota['nome'])  # TODO: melhorar perfomance com filtragem

        if not queryset:
            return Response(Respostas.ERRO_DESCONHECIDO.value)

        lista_rotas = []
        for obj in queryset:
            rota = RotaSerializer(obj).data

            rota_has_local = Rota_has_Local.objects.filter(Rota_id=obj)
            lista_local = []

            for rl in rota_has_local:
                local = Local.objects.get(id=RLSerializer(rl).data['Local_id'])
                lista_local.append(LocalSerializer(local).data)

            rota.update({"locais": lista_local})
            lista_rotas.append(rota)

        return Response(lista_rotas)

class EditarRota(RequisicaoAlterar):
    @staticmethod
    def post(request):
        # update name 
        rota = Rota.objects.get(id=request.data['id'])  # TODO: melhorar perfomance com filtragem
        rota.nome = request.data['nome']
        rota.save()

        # delete old local's
        queryset = Rota_has_Local.objects.filter(Rota_id=rota)
        for obj in queryset:
            obj.delete()

        # insert the new ones
        for local in request.data['locais']:
            Rota_has_Local.objects.create(Rota_id=rota,
                                          Local_id=Local.objects.get(id=local))

        return Response(Respostas.OK.value)

class ExcluirRota(RequisicaoAlterar):
    @staticmethod
    def post(request):
        rota = Rota.objects.get(id=request.data['id'])
        rota.delete()

        return Response(Respostas.OK.value)

########### RANGE ###########
class VisualizarPontoColetaProximos(Requisicao):
    @staticmethod
    def post(request):
        orig_point = (request.data['latitude'], request.data['longitude'])
        locais = Local.objects.all()

        proximos = []
        for obj in locais:
            local = LocalSerializer(obj).data
            comp_point = (local['latitude'], local['longitude'])

            distancia = distance.geodesic(orig_point, comp_point).km

            if(request.data['tipo'] == 1):
                if distancia <= float(request.data['raio']) and local['tipoLocal'] == 1: proximos.append(local)
            else:
                if distancia <= float(request.data['raio']) and local['tipoLocal'] != 1: proximos.append(local)
        return Response(proximos)

########### Unidade ###########
class ExibirUnidade(Requisicao):
    @staticmethod
    def post(request):
        try:            
            local = Local.objects.get(rotulo=request.data['nome'])

            queryset = Unidade.objects.filter(Local_id=local.pk)

            list_unit = []
            for lev_obj in queryset:
                unidade = UnidadeSerializer(lev_obj).data
                unidade.update({"endereco": LocalSerializer(local).data})

                associacao = Associacao.objects.get(id=lev_obj.Associacao_id.pk)
                unidade.update({"associacao": AssociacaoSerializer(associacao).data})
                
                list_unit.append(unidade)

            return Response(list_unit)

        except:
            return Response({"status": False, "data": sys.exc_info()[0]})

class listarUnidade(Requisicao):
    @staticmethod
    def post(request):
        try:
            queryset = Unidade.objects.all()  # queryset recebe todas as unidades
            
            list_ass = []  # Lista que vai receber a lista de json
            for lev_obj in queryset:
                if lev_obj.Associacao_id.id == request.data['idAssociacao']: #Verifica se a unidades pertence a associaçao
                    lev = UnidadeSerializer(lev_obj).data
                    print(LocalSerializer(lev_obj.Local_id).data)
                    lev.update({"endereco":LocalSerializer(lev_obj.Local_id).data})
                    list_ass.append(lev)

            return Response(list_ass)

        except:
            return Response({"status": False, "data": sys.exc_info()[0]})

########### LEVs ###########
class ExibirPEV(Requisicao):
    @staticmethod
    def post(request):
        try:
            local = Local.objects.get(rotulo=request.data['nome'])

            queryset = Pev.objects.filter(Local_id=local.pk)

            list_pev = []
            for pev_obj in queryset:
                pev = PevSerializer(pev_obj).data
                pev.update({"endereco": LocalSerializer(local).data})

                list_pev.append(pev)

            return Response(list_pev)

        except:
            return Response({"status": False, "data": sys.exc_info()[0]})

########### Associacao ###########
class listaAssociacoes(Requisicao):
    @staticmethod
    def post(request):
        try:
            queryset = Associacao.objects.all()#queryset recebe todas as associaçoes

            list_ass = [] #Lista que vai receber a lista de json
            for pev_obj in queryset:
                pev = AssociacaoSerializer(pev_obj).data

                list_ass.append(pev) #Append de todas as associaçoes

            return Response(list_ass)

        except:
            return Response({"status": False, "data": sys.exc_info()[0]})









