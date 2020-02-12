import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UnidadeProvider } from '../../providers/unidade/unidade';

/**
 * Generated class for the InfoLevPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-lev',
  templateUrl: 'info-lev.html',
  providers:[
    UnidadeProvider
  ]
})
export class InfoLevPage {
  
  public lev = [];
  public endereco = [];
  nomeLEV:String;

  constructor(public navCtrl: NavController, public navParams: NavParams,public unidadeProvider: UnidadeProvider) {
    this.nomeLEV = navParams.get('rotulo');
    this.pesquisarDadosLEV(navParams.get('rotulo'));
  }

  pesquisarDadosLEV(nomelev: string){
    this.unidadeProvider.pesquisarLEV(nomelev).then(LEV=>{
      console.log('nome do rotulo:' + nomelev)
      console.log(LEV);
    
      this.lev=LEV[0];
      this.endereco=LEV[0].endereco
      console.log(this.lev)

    })
  }
  



  
  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoLevPage');
  }

}
