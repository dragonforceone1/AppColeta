from django.shortcuts import render, redirect, get_object_or_404
#from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from server.models.coleta import Coleta
from server.models.local import Local
from server.models.Pev import Pev
from server.models.associacao import Associacao
from server.models.unidade import Unidade
from coleta.forms import LocalForm, GerenciaForm, PevForm, AssForm, UnidForm, PesquisaLocalForm

key = 'AIzaSyBDLG50zlrLCdR_rjc0j0bTFqWIoESXt_E'


# def listar(request):
#     locais = Local.objects.all()
#     return render(request, 'listarLocais.html', {'locais': locais,
#                                                  'admin': 0})

@login_required()
def listarAdmin(request):
    locais = Local.objects.all()
    return render(request, 'listarLocais.html', {'locais': locais,
                                                 'admin': 1})

@login_required()
def cadastrar(request):
    form = LocalForm(request.POST or None)

    if form.is_valid():
        endereco = str(form.cleaned_data['cidade']) + ',' + str(form.cleaned_data['logradouro']) + ',' + str(form.cleaned_data['numero'])
        return confirmaCadastro(request, endereco.replace(' ','%20'), form)
    else:
        return render(request, 'cadastroLocais.html', {'form': form,
                                                       'admin': 1,
                                                       'key': key})

@login_required()
def confirmaCadastro(request, endereco, formIniti):
    local = Local.objects.create(cidade=formIniti.cleaned_data['cidade'],
                                 logradouro=formIniti.cleaned_data['logradouro'],
                                 numero=formIniti.cleaned_data['numero'],
                                 latitude=formIniti.cleaned_data['latitude'],
                                 longitude=formIniti.cleaned_data['longitude'],
                                 rotulo=formIniti.cleaned_data['rotulo'],
                                 tipoLocal=int(formIniti.cleaned_data['tipoLocal']))
    form = LocalForm(request.POST or None, instance=local)
    local.delete() #remove o local temporario criado

    if form.is_valid():
        print(int(form.cleaned_data['latitude']))
        if int(form.cleaned_data['latitude']) != 0:
            print('entrou')
            form.save()
            ultimo = Local.objects.latest('id')
            if ultimo.tipoLocal == 1:
                return redirect('gerenciarLocal', ultimo.id)
            return redirect('listarAdmin')
        else:
            print('chamou')
            return render(request, 'cadastroLocais.html', {'form': form,
                                                           'admin': 1,
                                                           'key': key,
                                                           'confirma': 1,
                                                           'endereco': endereco,
                                                           'rotulo': form.cleaned_data['rotulo']})
    return redirect('listarAdmin')

@login_required()
def editar(request, id):
    local = get_object_or_404(Local, pk=id)
    form = LocalForm(request.POST or None, request.FILES or None, instance=local)

    if form.is_valid():
        form.save()
        return redirect('listarAdmin')

    return render(request, 'editarLocais.html', {'form': form,
                                                 'admin': 1,
                                                 'edit': 1,
                                                 'key': key,
                                                 'tipoLocal': local.tipoLocal})

@login_required()
def excluir(request, id):
    local = get_object_or_404(Local, pk=id)
    form = LocalForm(request.POST or None, request.FILES or None, instance=local)

    if request.method == 'POST':
        local.delete()
        return redirect('listarAdmin')

    return render(request, 'excluirLocais.html', {'form': form,
                                                  'admin': 1,
                                                  'excluir': 1,
                                                  'key': key})

@login_required()
def info(request, id):
    local = get_object_or_404(Local, pk=id)
    form = LocalForm(request.POST or None, request.FILES or None, instance=local)

    if request.method == 'POST':
        return redirect('listar')

    return render(request, 'excluirLocais.html', {'form': form,
                                                  'admin': 1,
                                                  'excluir': 0,
                                                  'key': key})

@login_required()
def gerenciarLocal(request, id):
    local = get_object_or_404(Local, pk=id)
    form = GerenciaForm(request.POST)

    if form.is_valid():
        try:
            obj = Coleta.objects.get(Local_id=form.cleaned_data['Local_id'],
                                     turno=form.cleaned_data['turno'],
                                     diaSemana=form.cleaned_data['diaSemana'])
            obj.delete()
        except Coleta.DoesNotExist:
            pass

        form.save()

    horarios = Coleta.objects.filter(Local_id=id)
    return render(request, 'gerenciaLocais.html', {'key': key,
                                                   'admin': 1,
                                                   'lat': str(local.latitude).replace(',', '.'),
                                                   'lng': str(local.longitude).replace(',', '.'),
                                                   'rotulo': local.rotulo,
                                                   'form': form,
                                                   'id': id,
                                                   'horarios': horarios.order_by('diaSemana','turno')})

# def infoLev(request, id):
#     local = get_object_or_404(Local, pk=id)
#     form = LevForm(request.POST)
#     levs = get_object_or_404(Lev, Local_id=id)
#
#     return render(request, 'excluirPev.html', {'form': form,
#                                                'rotulo': local.rotulo,
#                                                'levs': levs,
#                                                'excluir': 0,
#                                                'hora': levs.horarioFuncionamento,
#                                                'dia': levs.diasFuncionamento,
#                                                'lat': str(local.latitude).replace(',', '.'),
#                                                'lng': str(local.longitude).replace(',', '.'),
#                                                'key': key})

@login_required()
def editarPev(request, id):
    local = get_object_or_404(Local, pk=id)
    pevs = get_object_or_404(Pev, Local_id=id)
    form = PevForm(request.POST, instance=pevs)

    if form.is_valid():
        form.save()
        return render(request, 'excluirPev.html', {'form': form,
                                                   'id': id,
                                                   'rotulo': local.rotulo,
                                                   'pevs': pevs,
                                                   'excluir': 0,
                                                   'admin': 1,
                                                   'hora': pevs.horarioFuncionamento,
                                                   'dia': pevs.diasFuncionamento,
                                                   'lat': str(local.latitude).replace(',', '.'),
                                                   'lng': str(local.longitude).replace(',', '.'),
                                                   'key': key})

    return render(request, 'cadastroPev.html', {'form': form,
                                                'rotulo': local.rotulo,
                                                'lat': str(local.latitude).replace(',', '.'),
                                                'lng': str(local.longitude).replace(',', '.'),
                                                'dia': pevs.diasFuncionamento,
                                                'hora': pevs.horarioFuncionamento,
                                                'id': id,
                                                'key': key,
                                                'editar': 1})

@login_required()
def gerenciaPev(request, id):
    local = get_object_or_404(Local, pk=id)
    form = PevForm(request.POST)
    pevs = Pev.objects.filter(Local_id=id)

    if pevs:
        return render(request, 'excluirPev.html', {'form': form,
                                                   'id': id,
                                                   'rotulo': local.rotulo,
                                                   'excluir': 0,
                                                   'admin': 1,
                                                   'hora': pevs[0].horarioFuncionamento,
                                                   'dia': pevs[0].diasFuncionamento,
                                                   'lat': str(local.latitude).replace(',', '.'),
                                                   'lng': str(local.longitude).replace(',', '.'),
                                                   'key': key})

    if form.is_valid():
        form.save()
        return render(request, 'excluirPev.html', {'form': form,
                                                   'id': id,
                                                   'rotulo': local.rotulo,
                                                   'pevs': pevs,
                                                   'hora': form['horarioFuncionamento'].value(),
                                                   'dia': form['diasFuncionamento'].value(),
                                                   'excluir': 0,
                                                   'admin': 1,
                                                   'lat': str(local.latitude).replace(',', '.'),
                                                   'lng': str(local.longitude).replace(',', '.'),
                                                   'key': key})

    return render(request, 'cadastroPev.html', {'form': form,
                                                'rotulo': local.rotulo,
                                                'lat': str(local.latitude).replace(',', '.'),
                                                'lng': str(local.longitude).replace(',', '.'),
                                                'id': id,
                                                'key': key})

@login_required
def cadastrarAss(request):
    form = AssForm(request.POST or None)

    if form.is_valid():
        form.save()
        return redirect('listarAdmin')

    return render(request, 'cadastroAss.html', {'form': form})

@login_required()
def editarAss(request, id):
    associacao = get_object_or_404(Associacao, pk=id)
    form = AssForm(request.POST or None, request.FILES or None, instance=associacao)

    if form.is_valid():
        form.save()
        return redirect('listarAdmin')

    return render(request, 'cadastroAss.html', {'form': form})

@login_required()
def excluirAss(request, id):
    associacao = get_object_or_404(Associacao, pk=id)
    form = AssForm(request.POST or None, request.FILES or None, instance=associacao)

    if request.method == "POST":
        associacao.delete()
        return redirect('listarAdmin')

    return render(request, 'cadastroAss.html', {'form': form,
                                                'excluir': 1})

@login_required()
def infoAss(request, id):
    associacao = get_object_or_404(Associacao, pk=id)
    form = AssForm(request.POST or None, request.FILES or None, instance=associacao)

    return render(request, 'cadastroAss.html', {'form': form,
                                                'excluir': 0})

@login_required()
def cadastroUnid(request, id):
    local = get_object_or_404(Local, pk=id)
    associacoes = Associacao.objects.all()
    form = UnidForm(request.POST or None)

    if form.is_valid():
        form.save()
        return redirect('listarAdmin')

    return render(request, 'cadastroUnid.html', {'key': key,
                                                 'form': form,
                                                 'local': local.rotulo,
                                                 'associacoes': associacoes,
                                                 'rotulo': local.rotulo,
                                                 'lat': str(local.latitude).replace(',', '.'),
                                                 'lng': str(local.longitude).replace(',', '.'),
                                                 'id': id})

@login_required()
def gerenciarUnid(request, id):
    unidade = Unidade.objects.filter(Local_id=id)

    if unidade:
        local = get_object_or_404(Local, pk=id)
        unid = get_object_or_404(Unidade, Local_id=id)
        form = UnidForm(request.POST or None, request.FILES or None, instance=unid)
        return render(request, 'excluirUnid.html', {'key': key,
                                                    'form': form,
                                                    'local': local.rotulo,
                                                    'associacao': unid.Associacao_id.nome,
                                                    'sede': unid.sede,
                                                    'horario': unid.horarioFuncionamento,
                                                    'qntCatadores': unid.quantidadeCatadores,
                                                    'dias': unid.diasFuncionamento,
                                                    'rotulo': local.rotulo,
                                                    'lat': str(local.latitude).replace(',', '.'),
                                                    'lng': str(local.longitude).replace(',', '.'),
                                                    'id': id,
                                                    'excluir': 0,
                                                    'admin': True})

    return redirect('cadastroUnid', id)

@login_required()
def excluirUnid(request, id):
    local = get_object_or_404(Local, pk=id)
    unidade = get_object_or_404(Unidade, Local_id=id)
    form = UnidForm(request.POST or None, request.FILES or None, instance=unidade)

    print(unidade.sede)

    if request.method == "POST":
        unidade.delete()
        return redirect('listarAdmin')

    return render(request, 'excluirUnid.html', {'key': key,
                                                'form': form,
                                                'local': local.rotulo,
                                                'associacao': unidade.Associacao_id.nome,
                                                'sede': unidade.sede,
                                                'horario': unidade.horarioFuncionamento,
                                                'dias': unidade.diasFuncionamento,
                                                'rotulo': local.rotulo,
                                                'lat': str(local.latitude).replace(',', '.'),
                                                'lng': str(local.longitude).replace(',', '.'),
                                                'id': id,
                                                'excluir': 1})

@login_required()
def editarUnid(request, id):
    unidade = get_object_or_404(Unidade, Local_id=id)
    form = UnidForm(request.POST or None, request.FILES or None, instance=unidade)
    associacoes = Associacao.objects.all()
    local = get_object_or_404(Local, pk=id)

    if form.is_valid():
        form.save()
        return redirect('gerenciarUnid', id)

    return render(request, 'cadastroUnid.html', {'key': key,
                                                 'form': form,
                                                 'local': local.rotulo,
                                                 'sede': unidade.sede,
                                                 'associacoes': associacoes,
                                                 'rotulo': local.rotulo,
                                                 'lat': str(local.latitude).replace(',', '.'),
                                                 'lng': str(local.longitude).replace(',', '.'),
                                                 'id': id,
                                                 'editar': True})

