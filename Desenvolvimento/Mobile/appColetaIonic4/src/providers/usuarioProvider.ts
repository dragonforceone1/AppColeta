import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Usuario } from '../model/usuario/usuario';
import { Endereco } from '../model/usuario/endereco';
import { TipoVisibilidade } from '../model/usuario/tipoVisibilidade';
import { Municipio } from '../model/usuario/municipio';
import { Estado } from '../model/usuario/estado';
import { Pais } from '../model/usuario/pais';
import { TipoUsuario } from '../model/usuario/tipoUsuario';
import { ArmazenamentoLocalProvider } from './armazenamentoLocal/armazenamentoLocal';
import { ServidorProvider } from './servidor/servidor';

@Injectable()
//mudar nome para ControleUsuario
export class HttpProvider {

  public URL: string;
  public options;
  public linkImg = "";

  constructor(public http: HttpClient, 
              public servidor: ServidorProvider,
              public armazenamentoLocal: ArmazenamentoLocalProvider) {
    //console.log('Hello HttpProvider Provider');
    this.URL = servidor.URL;
    this.options = servidor.options;
  }

  //recebe um usuario, cadastrá-lo na API e retorná-lo completo, já com o id válido
  public cadastrarUsuario(usuario: Usuario, idFacebook: string, idGoogle: string) {
    return new Promise((resolve, reject) => {
      //dados a serem enviados na requisição
      var data = {
        nome: usuario.getNome(),
        email: usuario.getEmail(),
        visibilidadeEmail: usuario.getVisibilidadeEmail(),
        senha: usuario.getSenha(),
        cpf: usuario.getCpf(),
        telefone: usuario.getTelefone(),
        visibilidadeTelefones: usuario.getvisibilidadeTelefones(),
        celular: usuario.getCelular(),
        visibilidadeImagem: usuario.getVisibilidadeImagem(),
        dataNascimento: usuario.getDataNascimento(),
        visibilidadeDataNascimento: usuario.getVisibilidadeDataNascimento(),
        tipoUsuario: usuario.getTipoUsuario(),
        municipio: usuario.getEndereco().getMunicipio().getIdentificador(),
        logradouro: usuario.getEndereco().getLogradouro(),
        bairro: usuario.getEndereco().getBairro(),
        numero: usuario.getEndereco().getNumero(),
        visibilidadeMunicipio: usuario.getEndereco().getVisibilidadeMunicipio(),
        visibilidadeEstado: usuario.getEndereco().getVisibilidadeEstado(),
        visibilidadePais: usuario.getEndereco().getVisibilidadePais(),
        tokenFacebook: idFacebook,
        tokenGoogle: idGoogle
      };

      //data = JSON.stringify(usuario);
      //console.log("ENVIAR: ", data);
      
        this.servidor.enviarRequisicao(data, "cadastro/").then(resposta => {

          if(resposta['status']){ //sucesso
            resolve(true);
            return(true);
          }else{ //erro
            resolve(false);
            return(false);
          }
        });

    });
  }



  //recebe o usuário com as auterações locais, atualiza na API e retorna se houve sucesso
  public editarUsuario(usuario: Usuario) {
    //console.log("CPF=== ", usuario.getCpf());
    return new Promise((resolve, reject) => {
      //dados a serem enviados na requisição
      var data = {
        id: usuario.getIdentificador(),
        nome: usuario.getNome(),
        //cpf: usuario.getCpf(),
        email: usuario.getEmail(),
        visibilidadeEmail: usuario.getVisibilidadeEmail(),
        telefone: usuario.getTelefone(),
        celular: usuario.getCelular(),
        visibilidadeTelefones: 0,
        visibilidadeImagem: usuario.getVisibilidadeImagem(),
        dataNascimento: usuario.getDataNascimento(),
        visibilidadeDataNascimento: usuario.getVisibilidadeDataNascimento(),

        //tipoUsuario: usuario.getTipoUsuario(),
        logradouro: usuario.getEndereco().getLogradouro(),
        municipio: usuario.getEndereco().getMunicipio().getIdentificador(),
        bairro: usuario.getEndereco().getBairro(),
        numero: usuario.getEndereco().getNumero(),
        visibilidadeMunicipio: usuario.getEndereco().getVisibilidadeMunicipio(),
        visibilidadeEstado: usuario.getEndereco().getVisibilidadeEstado(),
        visibilidadePais: usuario.getEndereco().getVisibilidadePais()


      }

      //console.log("ENVIAR EDITAR:::> ", JSON.stringify(data));

      
      this.servidor.enviarRequisicao(data, "editarUsuario/").then(resposta => {

        if(resposta){ //sucesso
          resolve(true);
          return(true);
        }else{ //erro
          resolve(false);
          return(false);
        }
      });
      

    });
  }


  //recebe o id e a nova senha, atualiza na API e retorna se houve sucesso
  public alterarSenhaUsuario(identificador: number, senha: string, novaSenha: string) {
    return new Promise((resolve, reject) => {
      var data = {
        id: identificador,
        senha: senha,
        nova_senha: novaSenha
      };

      this.servidor.enviarRequisicao(data, "alterarSenhaUsuario/").then(resposta => {
        if(resposta){ //sucesso
          resolve(true);
          return(true);
        }else{ //erro
          resolve(false);
          return(false);
        }
      });

    });
  }

  public alterarImagemUsuario() {

  }

  //recebe o usuário e envia a requisição para a API excluir e, em caso de sucesso, termina a sessão
  public excluirUsuario() {
    return new Promise((resolve, reject) => {
      let id: number;

      this.armazenamentoLocal.recuperaUsuario().then(usuario => {

        id = usuario.getIdentificador();

        //return;
        if (id == undefined) {
          resolve(false);
          //console.log("ERRO!");
          return;
        } else {

          var data = {
            id: id

          };

          this.servidor.enviarRequisicao(data, "excluirUsuario/").then(resposta => {
            if(resposta){ //sucesso
              this.armazenamentoLocal.retiraUsuario();
              this.desconectarUsuario();
              resolve(true);
              return(true);
            }else{ //erro
              resolve(false);
              return(false);
            }
          });
        }
      });
    });
  }

  private salvaUsuarioLogado(res: any) {
    //console.log(res);

    //console.log('prof', res['data']['cpf']);

    var usuario: Usuario;

    usuario = new Usuario(res['data']['id'], res['data']['nome'],
      res['data']['email'],
      res['data']['cpf'],
      res['data']['visibilidadeEmail'],
      //res['data']['senha'],
      res['data']['senha'],
      res['data']['telefone'],
      res['data']['celular'],
      res['data']['visibilidadeTelefone'],
      this.linkImg + "/" + res['data']['id'],
      res['data']['visibilidadeImagem'],
      res['data']['dataNascimento'],
      res['data']['visibilidadeDataNascimento'],
      new Endereco(res['data']['endereco']['logradouro'],
        res['data']['endereco']['numero'],
        res['data']['endereco']['bairro'],
        TipoVisibilidade.PRIVADA, TipoVisibilidade.PRIVADA, TipoVisibilidade.PRIVADA,
        new Municipio(res['data']['endereco']['municipio']['id'],
          res['data']['endereco']['municipio']['nome'],
          new Estado(res['data']['endereco']['municipio']['estado']['id'],
            res['data']['endereco']['municipio']['estado']['nome'],
            res['data']['endereco']['municipio']['estado']['sigla'],
            new Pais(res['data']['endereco']['municipio']['estado']['pais']['id'],
              res['data']['endereco']['municipio']['estado']['pais']['nome'],
              res['data']['endereco']['municipio']['estado']['pais']['sigla'])))),
      TipoUsuario.USUARIO);


    //alert("USUARIO::: " + JSON.stringify(usuario));

    //console.log("MUN ID: ", res['data']['endereco']['municipio']['id']);

    //salva sessao
    this.armazenamentoLocal.salvaUsuario(usuario);
    this.armazenamentoLocal.salvaTokenAcesso(res['token']);


  }

  //recebe email e senha para login, envia a requisição pra API, e retorna o usuário em caso de sucesso
  public autenticarUsuario(email: string, senha: string) {
    //monta os dados enviados para a requisição
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        senha: senha
      };


      this.servidor.enviarRequisicao(data, "login/").then(resposta => {
        if(resposta){ //sucesso
          if(resposta.status){
            this.salvaUsuarioLogado(resposta);
          resolve(resposta);
          return(resposta);
          }else{ //errado
            resolve({status:false});
            return({status: false});
          }
          
        }else{ //erro
          resolve({status:false});
          return({status: false});
        }
      });

    });
  }

  //recebe o token do facebook e envia requisição pra API, retornando um usuário em caso de sucesso
  public autenticarUsuarioFacebook(email: string, token: string) {
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        token: token
      };


      this.servidor.enviarRequisicao(data, "facebookLogin/").then(resposta => {
        if(resposta){ //sucesso
          this.salvaUsuarioLogado(resposta);
          resolve(true);
          return(true);
        }else{ //erro
          resolve(false);
          return(false);
        }
      });

    });
  }

  //recebe o token do google e envia requisição pra API, retornando um usuário em caso de sucesso
  public autenticarUsuarioGoogle(email: string, token: string): any {
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        token: token
      };


      this.servidor.enviarRequisicao(data, "googleLogin/").then(resposta => {
        if(resposta){ //sucesso
          this.salvaUsuarioLogado(resposta);
          resolve(true);
          return(true);
        }else{ //erro
          resolve(false);
          return(false);
        }
      });

    });
  }

  //encerra a sessão do usuário localmente
  public desconectarUsuario() {
    this.armazenamentoLocal.retiraUsuario();
    this.armazenamentoLocal.retiraTokenAcesso();
  }

  //pesquisa um usuário pelo nome, enviando a requisição para a API e retorna uma lista de usuários com apenas alguns dados
  public pesquisarUsuario(nome: string) {
    return new Promise((resolve, reject) => {
      var data = {
        nome: nome
      };

      this.servidor.enviarRequisicao(data, "pesquisar/").then(resposta => {
        if(resposta){ //sucesso
          resolve(resposta);
          return(resposta);
        }else{ //erro
          resolve({ status: false });
          return({ status: false });
        }
      });

    });
  }

  //recebe o id do usuário q deseja visualizar, requisita a API e retorna o usuário, se existir
  public exibirUsuario(idUsuarioVisualizar: number) {
    return new Promise((resolve, reject) => {
      var data = {
        id: idUsuarioVisualizar
      };

      this.servidor.enviarRequisicao(data, "exibirUsuario/").then(resposta => {
        if(resposta){ //sucesso
          resolve(resposta);
          return(resposta);
        }else{ //erro
          resolve({ status: false });
          return({ status: false });
        }
      });


    });
  }

  /*public listaPaises() {
    return new Promise((resolve, reject) => {

      this.servidor.enviarRequisicao({}, "listarPaises/").then(resposta => {
        if(resposta){ //sucesso
          resolve(resposta['data']);
          return(resposta['data']);
        }else{ //erro
          resolve({ status: false });
          return({ status: false });
        }
      });

    });
  }

  public listaEstados(idPais: number) {
    return new Promise((resolve, reject) => {
      var data = {
        id: idPais
      };

      this.servidor.enviarRequisicao(data, "listarEstados/").then(resposta => {
        if(resposta){ //sucesso
          resolve(resposta['data']);
          return(resposta['data']);
        }else{ //erro
          resolve({ status: false });
          return({ status: false });
        }
      });

      
      this.http.post(this.URL + "listarEstados/", JSON.stringify(data), this.options)
        .subscribe((result: any) => {
          resolve(result);
          //console.log("Estados: ", result);
        },
          (error) => {
            //console.log("nenhum resultado");
            resolve({ status: false });
            // reject(error);
          });

    });
  }*/

}
