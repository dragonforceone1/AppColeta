import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HttpProvider } from '../../providers/usuarioProvider';

import { PerfilPage } from '../perfil/perfil';
import { TabsPage } from '../tabs/tabs';
import { Usuario } from '../../model/usuario/usuario';
import { Endereco } from '../../model/usuario/endereco';
import { TipoUsuario } from '../../model/usuario/tipoUsuario';
import { TipoVisibilidade } from '../../model/usuario/tipoVisibilidade';
import { Municipio } from '../../model/usuario/municipio';
import { Estado } from '../../model/usuario/estado';
import { Pais } from '../../model/usuario/pais';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [
    HttpProvider
  ]
})
export class LoginPage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private Http: HttpProvider
  ) {

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  goToProfile() {
    this.navCtrl.push(TabsPage);
  }

  //Login provisorio
  loga() {
    this.goToProfile();
  }


  login() {
    this.Http.autenticarUsuario(this.username, this.password).then((res) => {
      if (res['status']) {
        //console.log(res);

        //console.log('prof', res['data']['cpf']);

        var usuario: Usuario;

        usuario = new Usuario(res['data']['id'], res['data']['nome'],
          res['data']['email'],
          res['data']['cpf'],
          res['data']['visibilidadeEmail'],
          //res['data']['senha'],
          this.password,
          res['data']['telefone'],
          res['data']['celular'],
          res['data']['visibilidadeTelefone'],
          this.Http.linkImg + "/" + res['data']['id'],
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

        //console.log("USUARIO::: ", usuario);

        //console.log("MUN ID: ", res['data']['endereco']['municipio']['id']);

        //salva sessao
        this.Http.armazenamentoLocal.salvaUsuario(usuario);
        this.Http.armazenamentoLocal.salvaTokenAcesso(res['token']);


        this.goToProfile();
      } else {
        alert('Email ou senha incorretos');
      }
    }).catch((err) => {
      // This is never called
    });
  }

  goRegister() {
    this.navCtrl.push(RegisterPage);
  }

}
