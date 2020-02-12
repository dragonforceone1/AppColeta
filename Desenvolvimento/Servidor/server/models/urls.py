from django.conf.urls import url
from django.urls import path

from . import views
from server import coletaViews

urlpatterns = [
    path('cadastro/', views.CadastrarUsuario.as_view()),

    path('editarUsuario/', views.EditarUsuario.as_view()),
    path('excluirUsuario/', views.ExcluirUsuario.as_view()),
    path('alterarSenhaUsuario/', views.AlterarSenhaUsuario.as_view()),

    # path('alterarTipo/<int:pk>', views.AlterarTipoUsuario.as_view()),
    path('login/', views.AutenticarUsuario.as_view()),
    path('facebookLogin/', views.AutenticarUsuarioFacebook.as_view()),
    path('googleLogin/', views.AutenticarUsuarioGoogle.as_view()),

    path('pesquisar/', views.PesquisarUsuario.as_view()),
    path('exibirUsuario/', views.ExibirUsuario.as_view()),
    path('exibirUsuarioPesquisado/', views.ExibirUsuarioPesquisado.as_view()),

    path('listarPaises/', views.ListarPaises.as_view()),
    path('listarEstados/', views.ListarEstados.as_view()),
    path('listarMunicipios/', views.ListarMunicipios.as_view()),
    path('listarAssociacoes/', coletaViews.listaAssociacoes.as_view()),
    path('listarUnidades/', coletaViews.listarUnidade.as_view()),

    path('cadastrarColeta/', coletaViews.CadastrarColeta.as_view()),
    path('pesquisarColeta/', coletaViews.PesquisarColeta.as_view()),
    path('editarColeta/', coletaViews.EditarColeta.as_view()),
    path('excluirColeta/', coletaViews.ExcluirColeta.as_view()),
    path('excluirTodaColeta/', coletaViews.ExcluirTodaColeta.as_view()),

    path('cadastrarLocal/', coletaViews.CadastrarLocal.as_view()),
    path('pesquisarLocal/', coletaViews.PesquisarLocal.as_view()),
    path('editarLocal/', coletaViews.EditarLocal.as_view()),
    path('excluirLocal/', coletaViews.ExcluirLocal.as_view()),

    path('cadastrarRota/', coletaViews.CadastrarRota.as_view()),
    path('pesquisarRota/', coletaViews.PesquisarRota.as_view()),
    path('editarRota/', coletaViews.EditarRota.as_view()),
    path('excluirRota/', coletaViews.ExcluirRota.as_view()),

    path('visualizarLocalProximos/', coletaViews.VisualizarPontoColetaProximos.as_view()),

    path('cadastroEndereco/', views.InserirEndereco.as_view()),
    path('editarEndereco/', views.EditarEndereco.as_view()),
    path('excluirEndereco/<int:pk>', views.ExcluirEndereco.as_view()),
    path('cadastroMunicipio/', views.InserirMunicipio.as_view()),
    path('cadastroEstado/', views.InserirEstado.as_view()),
    path('cadastroPais/', views.InserirPais.as_view()),

    path('exibirLev/',coletaViews.ExibirLEV.as_view()),
    path('exibirUnidade/',coletaViews.ExibirUnidade.as_view())
]
