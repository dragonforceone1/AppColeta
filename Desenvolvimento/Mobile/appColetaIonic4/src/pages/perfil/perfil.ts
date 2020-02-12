import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GerenciarPage } from '../gerenciar/gerenciar';

import { Usuario } from '../../model/usuario/usuario';
import { Endereco } from '../../model/usuario/endereco';
import { Municipio } from '../../model/usuario/municipio';
import { Estado } from '../../model/usuario/estado';
import { Pais } from '../../model/usuario/pais';
import { TipoVisibilidade } from '../../model/usuario/tipoVisibilidade';
import { TipoUsuario } from '../../model/usuario/tipoUsuario';
import { HttpProvider } from '../../providers/usuarioProvider'


import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
  providers: [
    HttpProvider
  ]
})
export class PerfilPage {

  public usuario: Usuario;
  public usuarioLogado: Usuario;

  public igual: boolean;
  public idLogado: number;
  public idPesquisa: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private httpProvider: HttpProvider) {

    let id = navParams.get('id');

    this.idPesquisa = navParams.get('id');

    ////console.log("Recebeu: ",navParams.get('id'));
    this.usuario = new Usuario(-1, "", "", "0", TipoVisibilidade.PRIVADA, "senha", 0, 0, TipoVisibilidade.PRIVADA, "img", TipoVisibilidade.PRIVADA, null, TipoVisibilidade.PRIVADA, new Endereco("", 0, "", TipoVisibilidade.PRIVADA, TipoVisibilidade.PRIVADA, TipoVisibilidade.PRIVADA, new Municipio(0, "", new Estado(0, "", "", new Pais(0, "", "")))), TipoUsuario.USUARIO);
    this.carregaDados();
  }

  carregaDados() {
    this.httpProvider.armazenamentoLocal.recuperaUsuario().then(usuario => {
      if (usuario == null) { //nao esta logado
        this.usuarioLogado = undefined;
        this.idLogado = undefined;
        this.igual = false;
        if(this.idPesquisa == undefined){
          this.goToHome();
        }

      } else {//esta logado
        this.usuarioLogado = usuario;
        this.usuario = usuario;
        this.idLogado = this.usuarioLogado.getIdentificador();
        if (this.idPesquisa == undefined || this.idPesquisa == this.idLogado) {
          this.igual = true;
        }
      }


      if (this.idPesquisa != undefined) { //visualizar outro perfil
        this.pesquisaUsuario();
      } else if (this.usuario == undefined) { //nao esta logado e nem é feito pesquisa
        this.goToHome();
      }

    });
  }



  pesquisaUsuario() {

    let idUsuarioVisualizar = this.navParams.get('id');

    //console.log(idUsuarioVisualizar, " =? ", this.idLogado);

    return new Promise((resolve, reject) => {
      var data = {
        id: idUsuarioVisualizar
      };

      this.httpProvider.http.post(this.httpProvider.URL + "exibirUsuario/", JSON.stringify(data), this.httpProvider.options)
        .subscribe((result: any) => {
          resolve(result);

          let res = result;

          this.usuario.setNome(res['data']['nome']);
          this.usuario.setEmail(res['data']['email']);
          this.usuario.setTelefone(res['data']['telefone']);
          this.usuario.setCelular(res['data']['celular']);
          this.usuario.setDataNascimento(res['data']['dataNascimento']);
          if (res['data']['endereco'] != undefined) {

            let nomeMunicipio = "";
            let nomeEstado = "";
            let nomePais = "";

            /*if(res['data']['endereco']['municipio'] != undefined){
              nomeMunicipio = res['data']['endereco']['municipio']['nome'];
            }
            
            if(res['data']['endereco']['municipio']['estado']['pais'] != undefined){
              nomePais = res['data']['endereco']['municipio']['estado']['nome'];
            }

            if(res['data']['endereco']['municipio']['estado'] != undefined){
              nomeEstado = res['data']['endereco']['municipio']['estado']['pais']['nome'];
            }*/
            let end = new Endereco(res['data']['endereco']['logradouro'], res['data']['endereco']['numero'], res['data']['endereco']['bairro'], TipoVisibilidade.PRIVADA, TipoVisibilidade.PRIVADA, TipoVisibilidade.PRIVADA, new Municipio(0, nomeMunicipio, new Estado(0, nomeEstado, "", new Pais(0, nomePais, ""))));
            this.usuario.setEndereco(end);
          }
        },
          (error) => {
            //console.log("nenhum resultado");
            resolve({ status: false });
            // reject(error);
          });

    });


  }

  ionViewWillEnter() {

    this.carregaDados();

  }

  ionViewDidLoad() {
    //this.httpProvider.GetJSon()
  }

  goToEdit() {
    this.navCtrl.push(GerenciarPage);
  }

  goToHome() {
    this.navCtrl.push(HomePage);
  }

}
