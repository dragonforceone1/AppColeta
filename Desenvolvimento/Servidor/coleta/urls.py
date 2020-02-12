from django.urls import path
from .views import cadastrar, editar, excluir, gerenciarLocal, info, listarAdmin, gerenciaPev, editarPev
from .views import cadastrarAss, editarAss, excluirAss, infoAss, cadastroUnid, excluirUnid, gerenciarUnid, editarUnid

urlpatterns = [
    #path('listar/', listar, name='listar'),
    path('listar_admin/', listarAdmin, name='listarAdmin'),
    path('cadastro/', cadastrar, name='cadastro'),
    path('editar/<int:id>', editar, name='editar'),
    path('excluir/<int:id>', excluir, name='excluir'),
    path('info/<int:id>', info, name='info'),
    path('gerenciarLocal/<int:id>', gerenciarLocal, name='gerenciarLocal'),
    path('gerenciarLev/<int:id>', gerenciaPev, name='gerenciarPev'),
    path('gerenciarUnid/<int:id>', gerenciarUnid, name='gerenciarUnid'),
    #path('infoLev/<int:id>', infoLev, name='infoLev'),
    path('editarLev/<int:id>', editarPev, name='editarPev'),
    path('cadastroAss/', cadastrarAss, name='cadastrarAss'),
    path('editarAss/<int:id>', editarAss, name='editarAss'),
    path('excluirAss/<int:id>', excluirAss, name='excluirAss'),
    path('infoAss/<int:id>', infoAss, name='infoAss'),
    path('cadastroUnid/<int:id>', cadastroUnid, name='cadastroUnid'),
    path('excluirUnid/<int:id>', excluirUnid, name='excluirUnid'),
    path('editarUnid/<int:id>', editarUnid, name='editarUnid'),
]