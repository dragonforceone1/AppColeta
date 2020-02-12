import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { HomePage } from '../home/home';
import { HttpProvider } from '../../providers/usuarioProvider';

/**
 * Generated class for the PesquisarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pesquisar',
  templateUrl: 'pesquisar.html',
})
export class PesquisarPage {

  //uma lista de usuarios
  username: string;
  public lista_usuarios: any;
  public logado: boolean;

  constructor(public navCtrl: NavController, private Http: HttpProvider, public navParams: NavParams) {
    this.lista_usuarios = [];
    this.logado = false;
  }

  onInput(ev: any) {
    this.username = ev.target.value;
    this.pesquisar();
    ////console.log(this.username);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PesquisarPage');

  }

  goToProfile(id: number) {
    //console.log(id);
    this.navCtrl.push(PerfilPage, { id: id });
  }

  goToHome() {
    this.navCtrl.push(HomePage);
  }

  pesquisar() {
    var id: number;

    this.Http.armazenamentoLocal.recuperaUsuario().then(val => {
      if(val != undefined){
        id = val.getIdentificador();
      }else{

      }
      
    });

    this.Http.pesquisarUsuario(this.username).then((res) => {
      this.lista_usuarios = res;

    }).catch((err) => {
      // This is never called
    });
  }

  ionViewWillEnter() {
    this.confereLogado();
  }

  private confereLogado() {
    this.Http.armazenamentoLocal.isLogado().then(logado => {
      this.logado = logado;
    });

  }

}
