import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Unidade } from '../../model/associacao_levs/unidade';
import { HttpProvider } from '../../providers/usuarioProvider';
import { UnidadeProvider } from '../../providers/unidade/unidade';

/**
 * Generated class for the InfoAssociacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-associacao',
  templateUrl: 'info-associacao.html',
  providers: [
    UnidadeProvider
  ]
})
export class InfoAssociacaoPage {
  public associacao = [];
  public unidade = [];
  public endereco = [];
  nomeunidade:String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Http: HttpProvider, 
    private unidadeProvide: UnidadeProvider) {
    this.nomeunidade = navParams.get('rotulo');
    this.pesquisarDadosUnidade(navParams.get('rotulo'));
    
  }
  
  pesquisarDadosUnidade(nomeunidade: string){
    this.unidadeProvide.pesquisaUnidade(nomeunidade).then(unidade=>{
      console.log('nome do rotulo:' + unidade)
      console.log(unidade);

      this.unidade=unidade[0];
      this.associacao=unidade[0].associacao;
      this.endereco=unidade[0].endereco;
    
    })
  }
  
  

  



  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoAssociacaoPage');
  }

}
