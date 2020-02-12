# -*- coding: utf-8 -*-
from django.contrib.auth.hashers import make_password
from django.shortcuts import render, get_object_or_404, redirect
from django.core.mail import send_mail
from .controladores.Autenticacoes import *
from .controladores.Requisicoes import *
from .controladores.Respostas import *
from .serializers import *

from .Form import UserForm


class RecuperaEmail(RequisicaoAlterar):
    @staticmethod
    def post(request):
        user = Usuario.objects.get(email=request.data['email'])
        user.tokenSenha = generateToken(Usuario, request.data['email'])
        user.save()
        mensagem = 'Óla guerreiro,\n Estamos aqui para ajudar-lhe a conquistar o que e seu por direito!!!\n' \
                   'para isso basta acessar a esse portal magico e logo logo você podera novamente desfrutar de seu grandioso perfil!!!\n' \
                   'www.institutoirr.com.br/app/recuperar/' + str(user.tokenSenha) + '/' + str(user.id) + '\n' \
                                                                                                          'Boa sorte! que os 7 reinos estajá com você'
        if not user:
            return Response(Respostas.EMAIL_NAO_ENCONTRADO.value)

        send_mail(
            'Subject here',
            mensagem,
            'no-reply@institutoirr.com.br',
            [user.email],
            fail_silently=False, )

        return Response(Respostas.OK.value)


def RecuperaSenha(request, token, id):
    user = get_object_or_404(Usuario, pk=id)
    if user.tokenSenha != token:
        return Response(Respostas.TOKEN_ERRADO.value)

    form = UserForm(request.POST)

    if form.is_valid():
        user.senha = make_password(form.data['senha'], salt=randomWord(16))
        user.save()
        return redirect('listarAdmin')
    else:
        return render(request, 'recuperaSenha.html', {'form': form})


class CadastrarUsuario(Requisicao):
    queryset = Usuario.objects.all()

    def post(self, request):
        novo_usuario = Usuario.objects.create(nome=request.data['nome'],
                                              email=request.data['email'],
                                              cpf=request.data['cpf'],
                                              senha=make_password(request.data['senha'], salt=randomWord(16)),
                                              telefone=request.data['telefone'] if 'telefone' in request.data else None,
                                              celular=request.data['celular'],
                                              dataNascimento=request.data['dataNascimento'],
                                              visibilidadeDataNascimento=request.data['visibilidadeDataNascimento'],
                                              visibilidadeEmail=request.data['visibilidadeEmail'],
                                              visibilidadeTelefones=request.data['visibilidadeTelefones'],
                                              tokenSenha=None,
                                              tokenFacebook=(request.data[
                                                                 'tokenFacebook'] if 'tokenFacebook' in request.data else None),
                                              tokenGoogle=(request.data[
                                                               'tokenGoogle'] if 'tokenGoogle' in request.data else None),
                                              tipoUsuario=request.data['tipoUsuario'])
        novo_usuario.save()

        novo_endereco = Endereco.objects.create(Usuario=novo_usuario,
                                                Municipio=Municipio.objects.get(id=request.data['municipio']),
                                                logradouro=request.data['logradouro'],
                                                bairro=request.data['bairro'],
                                                numero=request.data['numero'] if 'numero' in request.data else None,
                                                visibilidadeMunicipio=request.data['visibilidadeMunicipio'],
                                                visibilidadeEstado=request.data['visibilidadeEstado'],
                                                visibilidadePais=request.data['visibilidadePais'])
        novo_endereco.save()

        return Response({'status': True, 'token': generateToken(Usuario, request['email'])})


class EditarUsuario(RequisicaoAlterar):
    @staticmethod
    def post(request):
        authentication = ApiKeyAuthentication()
        if authentication.is_authenticated(request) is not True:
            return Response(Respostas.NAO_AUTORIZADO.value)

        user = Usuario.objects.get(id=request.data['id'])
        user.nome = request.data['nome']
        user.email = request.data['email']
        user.imagem = request.data['imagem']
        user.visibilidadeEmail = request.data['visibilidadeEmail']
        user.telefone = request.data['telefone']
        user.celular = request.data['celular']
        user.visibilidadeTelefones = request.data['visibilidadeTelefones']
        user.dataNascimento = request.data['dataNascimento']
        user.visibilidadeDataNascimento = request.data['visibilidadeDataNascimento']
        user.save()

        endereco = Endereco.objects.get(Usuario=request.data['id'])
        endereco.logradouro = request.data['logradouro']
        endereco.bairro = request.data['bairro']
        endereco.numero = request.data['numero']
        endereco.Municipio = Municipio.objects.get(id=request.data['municipio'])
        endereco.visibilidadeMunicipio = request.data['visibilidadeMunicipio']
        endereco.visibilidadeEstado = request.data['visibilidadeEstado']
        endereco.visibilidadePais = request.data['visibilidadePais']
        endereco.save()

        return Response(Respostas.OK.value)


class AlterarSenhaUsuario(RequisicaoAlterar):
    @staticmethod
    def post(request):
        authentication = ApiKeyAuthentication()
        if authentication.is_authenticated(request) is not True:
            return Response(Respostas.NAO_AUTORIZADO.value)

        user = Usuario.objects.get(id=request.data['id'])

        senha_request = make_password(request.data['senha'], salt=user.senha[21:37])
        if senha_request == user.senha:
            user.senha = make_password(request.data['nova_senha'], salt=randomWord(16))
            user.save()
            return Response(Respostas.OK)
        else:
            return Response(Respostas.SENHA_ERRADA)


class ExcluirUsuario(RequisicaoAlterar):
    @staticmethod
    def post(request):
        authentication = ApiKeyAuthentication()
        if authentication.is_authenticated(request) is not True:
            return Response(Respostas.NAO_AUTORIZADO.value)

        user = Usuario.objects.get(id=request.data['id'])
        user.delete()
        return Response(Respostas.OK.value)


class AlterarTipoUsuario(RequisicaoAlterar):
    queryset = Usuario.objects.all()


class AutenticarUsuario(RequisicaoAlterar):
    @staticmethod
    def post(request):
        request = request.data

        if 'email' not in request or 'senha' not in request:
            return Response(Respostas.REQUISICAO_MAL_FORMATADA.value)

        queryset = Usuario.objects.get(email=request['email'])

        if not queryset:
            return Response(Respostas.ERRO_DESCONHECIDO.value)

        senha_request = make_password(request['senha'], salt=queryset.senha[21:37])
        if senha_request == queryset.senha:
            response = {'status': True, 'token': generateToken(Usuario, request['email']),
                        'data': UsuarioSerializer(queryset).data}

            endereco_usuario = Endereco.objects.get(Usuario=queryset.id)
            response['data']['endereco'] = EnderecoSerializer(endereco_usuario).data

            municipio_usuario = Municipio.objects.get(id=endereco_usuario.Municipio.pk)
            response['data']['endereco']['municipio'] = MunicipioSerializer(municipio_usuario).data

            estado_usuario = Estado.objects.get(id=municipio_usuario.Estado.pk)
            response['data']['endereco']['municipio']['estado'] = EstadoSerializer(estado_usuario).data

            pais_usuario = Pais.objects.get(id=estado_usuario.Pais.pk)
            response['data']['endereco']['municipio']['estado']['pais'] = PaisSerializer(pais_usuario).data

            return Response(response)
        else:
            return Response(Respostas.SENHA_ERRADA.value)


class AutenticarUsuarioFacebook(RequisicaoAlterar):
    @staticmethod
    def post(request):
        request = request.data

        if 'email' not in request or 'token' not in request:
            return Response(Respostas.REQUISICAO_MAL_FORMATADA.value)

        queryset = Usuario.objects.get(email=request['email'])

        if not queryset:
            return Response(Respostas.ERRO_DESCONHECIDO.value)

        if request['token'] == queryset.tokenFacebook:
            response = {'status': True, 'token': generateToken(Usuario, request['email']),
                        'data': UsuarioSerializer(queryset).data}

            endereco_usuario = Endereco.objects.get(Usuario=queryset.id)
            response['data']['endereco'] = EnderecoSerializer(endereco_usuario).data

            municipio_usuario = Municipio.objects.get(id=endereco_usuario.Municipio.pk)
            response['data']['endereco']['municipio'] = MunicipioSerializer(municipio_usuario).data

            estado_usuario = Estado.objects.get(id=municipio_usuario.Estado.pk)
            response['data']['endereco']['municipio']['estado'] = EstadoSerializer(estado_usuario).data

            pais_usuario = Pais.objects.get(id=estado_usuario.Pais.pk)
            response['data']['endereco']['municipio']['estado']['pais'] = PaisSerializer(pais_usuario).data

            return Response(response)
        else:
            return Response(Respostas.TOKEN_ERRADO.value)


class AutenticarUsuarioGoogle(RequisicaoAlterar):
    @staticmethod
    def post(request):
        request = request.data

        if 'email' not in request or 'token' not in request:
            return Response(Respostas.REQUISICAO_MAL_FORMATADA.value)

        queryset = Usuario.objects.get(email=request['email'])

        if not queryset:
            return Response(Respostas.ERRO_DESCONHECIDO.value)

        if request['token'] == queryset.tokenGoogle:
            response = {'status': True, 'token': generateToken(Usuario, request['email']),
                        'data': UsuarioSerializer(queryset).data}

            endereco_usuario = Endereco.objects.get(Usuario=queryset.id)
            response['data']['endereco'] = EnderecoSerializer(endereco_usuario).data

            municipio_usuario = Municipio.objects.get(id=endereco_usuario.Municipio.pk)
            response['data']['endereco']['municipio'] = MunicipioSerializer(municipio_usuario).data

            estado_usuario = Estado.objects.get(id=municipio_usuario.Estado.pk)
            response['data']['endereco']['municipio']['estado'] = EstadoSerializer(estado_usuario).data

            pais_usuario = Pais.objects.get(id=estado_usuario.Pais.pk)
            response['data']['endereco']['municipio']['estado']['pais'] = PaisSerializer(pais_usuario).data

            return Response(response)
        else:
            return Response(Respostas.TOKEN_ERRADO.value)


class PesquisarUsuario(Requisicao):
    serializer_class = UsuarioPesquisa
    permission_classes = (AllowAny,)

    @staticmethod
    def post(request):
        usuario = request.data

        if 'nome' not in usuario:
            return Response(Respostas.PESQUISA_NAO_ENCONTRADO.value)

        queryset = Usuario.objects.filter(nome__icontains=usuario['nome'])  # TODO: melhorar perfomance com filtragem
        if not queryset:
            return Response(Respostas.ERRO_DESCONHECIDO.value)

        lista_usuarios = []
        for user in queryset:
            lista_usuarios.append(UsuarioPesquisa(user).data)

        return Response(lista_usuarios)


class ExibirUsuario(Requisicao):

    @staticmethod
    def post(request):
        response = {'status': True}
        user = Usuario.objects.get(id=request.data['id'])

        endereco_usuario = Endereco.objects.get(Usuario=user.pk)
        endereco = EnderecoSerializer(endereco_usuario).data

        if 'token' not in request.data:
            if user.visibilidadeDataNascimento > 0:
                user.dataNascimento = None

            if user.visibilidadeEmail > 0:
                user.email = None

            if user.visibilidadeTelefones > 0:
                user.telefone = None
                user.celular = None

            if endereco_usuario.visibilidadeMunicipio < 1:
                municipio_usuario = Municipio.objects.get(id=endereco_usuario.Municipio.pk)
                endereco['municipio'] = MunicipioSerializer(municipio_usuario).data

                if endereco_usuario.visibilidadeEstado < 1:
                    estado_usuario = Estado.objects.get(id=municipio_usuario.Estado.pk)
                    endereco['municipio']['estado'] = EstadoSerializer(estado_usuario).data

                    if endereco_usuario.visibilidadePais < 1:
                        pais_usuario = Pais.objects.get(id=estado_usuario.Pais.pk)
                        endereco['municipio']['estado']['pais'] = PaisSerializer(pais_usuario).data
        else:
            if user.visibilidadeDataNascimento > 1:
                user.dataNascimento = None

            if user.visibilidadeEmail > 1:
                user.email = None

            if user.visibilidadeTelefones > 1:
                user.telefone = None
                user.celular = None

            if endereco_usuario.visibilidadeMunicipio < 2:
                municipio_usuario = Municipio.objects.get(id=endereco_usuario.Municipio.pk)
                endereco['municipio'] = MunicipioSerializer(municipio_usuario).data

                if endereco_usuario.visibilidadeEstado < 2:
                    estado_usuario = Estado.objects.get(id=municipio_usuario.Estado.pk)
                    endereco['municipio']['estado'] = EstadoSerializer(estado_usuario).data

                    if endereco_usuario.visibilidadePais < 2:
                        pais_usuario = Pais.objects.get(id=estado_usuario.Pais.pk)
                        endereco['municipio']['estado']['pais'] = PaisSerializer(pais_usuario).data

        response['data'] = UsuarioSerializer(user).data
        response['data']['endereco'] = endereco
        return Response(response)


class ExibirUsuarioPesquisado(Requisicao):
    @staticmethod
    def post(request):
        response = {'status': True}
        user = Usuario.objects.get(id=request.data['id'])

        endereco_usuario = Endereco.objects.get(Usuario=user.pk)
        endereco = EnderecoPesqSerializer(endereco_usuario).data

        if 'token' not in request.data:
            if user.visibilidadeEmail == 0:  # perfil privado
                user.email = None
                user.telefone = None
                user.celular = None
                user.dataNascimento = None

            if user.visibilidadeEmail == 1:
                municipio_usuario = Municipio.objects.get(id=endereco_usuario.Municipio.pk)
                endereco['municipio'] = MunicipioSerializer(municipio_usuario).data
                estado_usuario = Estado.objects.get(id=municipio_usuario.Estado.pk)
                endereco['municipio']['estado'] = EstadoSerializer(estado_usuario).data
                pais_usuario = Pais.objects.get(id=estado_usuario.Pais.pk)
                endereco['municipio']['estado']['pais'] = PaisSerializer(pais_usuario).data
        else:
            if user.visibilidadeDataNascimento > 1:
                user.dataNascimento = None

            if user.visibilidadeEmail > 1:
                user.email = None

            if user.visibilidadeTelefones > 1:
                user.telefone = None
                user.celular = None

            if endereco_usuario.visibilidadeMunicipio < 2:
                municipio_usuario = Municipio.objects.get(id=endereco_usuario.Municipio.pk)
                print(municipio_usuario.Estado)
                endereco['municipio'] = MunicipioSerializer(municipio_usuario).data

                if endereco_usuario.visibilidadeEstado < 2:
                    estado_usuario = Estado.objects.get(id=municipio_usuario.Estado.pk)
                    endereco['municipio']['estado'] = EstadoSerializer(estado_usuario).data

                    if endereco_usuario.visibilidadePais < 2:
                        pais_usuario = Pais.objects.get(id=estado_usuario.Pais.pk)
                        endereco['municipio']['estado']['pais'] = PaisSerializer(pais_usuario).data

        response['data'] = UsuarioPesquisadoSerializer(user).data
        response['data']['endereco'] = endereco
        return Response(response)


class ListarPaises(Requisicao):
    @staticmethod
    def post(request):
        authentication = ApiKeyAuthentication()
        if authentication.is_authenticated(request) is not True:
            return Response(Respostas.NAO_AUTORIZADO.value)

        paises = Pais.objects.all()
        if not paises:
            return Response(Respostas.PESQUISA_NAO_ENCONTRADO.value)

        lista = []
        for pais in paises:
            lista.append(PaisSerializer(pais).data)

        return Response({'status': True, 'data': lista})


class ListarEstados(Requisicao):
    @staticmethod
    def post(request):
        authentication = ApiKeyAuthentication()
        if authentication.is_authenticated(request) is not True:
            return Response(Respostas.NAO_AUTORIZADO.value)

        estados = Estado.objects.filter(Pais=request.data['id'])
        if not estados:
            return Response(Respostas.PESQUISA_NAO_ENCONTRADO.value)

        lista = []
        for estado in estados:
            lista.append(EstadoSerializer(estado).data)

        return Response({'status': True, 'data': lista})


class ListarMunicipios(Requisicao):
    @staticmethod
    def post(request):
        authentication = ApiKeyAuthentication()
        if authentication.is_authenticated(request) is not True:
            return Response(Respostas.NAO_AUTORIZADO.value)

        municipios = Municipio.objects.filter(Estado=request.data['id'])
        if not municipios:
            return Response(Respostas.NAO_AUTORIZADO.value)

        lista = []
        for municipio in municipios:
            lista.append(MunicipioSerializer(municipio).data)

        return Response({'status': True, 'data': lista})


class InserirEndereco(Requisicao):
    queryset = Endereco.objects.all()
    serializer_class = EnderecoSerializer


class EditarEndereco(generics.RetrieveUpdateDestroyAPIView):
    serializer = Endereco.objects.all()
    serializer_class = EnderecoSerializer


class ExcluirEndereco(generics.RetrieveUpdateDestroyAPIView):
    serializer = Endereco.objects.all()
    serializer_class = EnderecoSerializer


class InserirMunicipio(Requisicao):
    queryset = Municipio.objects.all()
    serializer_class = MunicipioSerializer


class InserirEstado(Requisicao):
    queryset = Estado.objects.all()
    serializer_class = EstadoSerializer


class InserirPais(Requisicao):
    queryset = Pais.objects.all()
    serializer_class = PaisSerializer


class ExibirPEV(Requisicao):
    @staticmethod
    def post(request):
        return Response(response)
