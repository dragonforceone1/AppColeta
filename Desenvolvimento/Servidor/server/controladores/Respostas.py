from enum import Enum


class Respostas(Enum):
    ERRO = {'status': False}
    NAO_AUTORIZADO = {'status': False, 'detail': "Não está autenticado..."}
    SENHA_ERRADA = {'status': False, 'detail': 'Infelizmente a senha não está certa. Tenta de novo aí!'}
    USUARIO_NAO_EXISTE = {'status': False, 'detail': 'Esse usuário aparentemente não existe. Que tal se cadastrar?'}
    ERRO_DESCONHECIDO = {'status': False, 'detail': 'Epa! Esse erro é novo para nós, '
                                                    'vamos dar uma olhada assim que possível!'}
    REQUISICAO_MAL_FORMATADA = {'status': False, 'detail': 'Infelizmente o geramos uma requisicao não muito bem '
                                                           'feita...'}
    TOKEN_ERRADO = {'status': False, 'detail': 'Houve um problema de autenticação com os serviços externos...'}
    PESQUISA_NAO_ENCONTRADO = {'status': False, 'detail': "Não encontramos nenhum resultado para sua pesquisa..."}

    OK = {'status': True}
