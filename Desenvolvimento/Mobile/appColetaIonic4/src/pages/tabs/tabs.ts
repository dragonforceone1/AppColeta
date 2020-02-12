import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { PerfilPage } from '../perfil/perfil';
import { PesquisarPage } from '../pesquisar/pesquisar';
import { MapaColetaPage } from '../mapa-coleta/mapa-coleta';
import { Platform } from 'ionic-angular';
import { InfoLevPage } from '../info-lev/info-lev';
import { InfoAssociacaoPage } from '../info-associacao/info-associacao';


@Component({
  templateUrl: 'tabs.html',
  providers: [Keyboard]
})
export class TabsPage {

  tab1Root = PerfilPage;
  tab2Root = PesquisarPage;
  //tab3Root = ;
  //tab4Root = ;
  tab5Root = MapaColetaPage ;
  //tab6Root = ;
 
  
  valueforngif = true;

  constructor() { }
  showListener() {
    console.log('keyboard visible');
    document.body.classList.add('keyboard-is-open');
  }
  hideListener() {
    console.log('keyboard hides');
    document.body.classList.remove('keyboard-is-open');
  }


  ionViewDidEnter() {
    window.addEventListener('keyboardWillShow', this.showListener);
    window.addEventListener('keyboardDidHide', this.hideListener);
  }

  ionViewWillLeave() {
    window.removeEventListener('keyboardWillShow', this.showListener);
    window.removeEventListener('keyboardDidHide', this.hideListener);
  }

}
