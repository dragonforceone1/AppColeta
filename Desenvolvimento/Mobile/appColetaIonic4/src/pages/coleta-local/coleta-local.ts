import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ControladorColetaProvider } from '../../providers/coletaProvider';
import { Local } from '../../model/coleta/local';

/**
 * Generated class for the ColetaLocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coleta-local',
  templateUrl: 'coleta-local.html',
})
export class ColetaLocalPage {
  //local: Local;
  nomeLocal;
  
  public coleta = []; /*[{ 
    id: 1, 
    diaSemana: 1, 
    tipoLixo: 1, 
    turno: 1, 
    local:{ 
      id: 1, 
      rotulo: 'A', 
      latitude: 0, 
      longitude: 0, 
      tipoLocal: 1 
  } 
  }, { 
    id: 2, 
    diaSemana: 2, 
    tipoLixo: 1, 
    turno: 1, 
    local: { 
      id: 1, 
      rotulo: 'A', 
      latitude: 0, 
      longitude: 0, 
      tipoLocal: 1
  } 
  }
];*/
 
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public coletaProvider: ControladorColetaProvider) {
    //let resp = navParams.get('local');
    //alert(navParams.get('rotulo'));
    this.nomeLocal = navParams.get('rotulo');
    //this.local = new Local(navParams.get('id'),navParams.get('rotulo'),navParams.get('latitude'),navParams.get('longitude'),navParams.get('tipoLocal'));
    ////console.log("Chegou",this.local);
    this.carregaDados(navParams.get('rotulo'));

  }

  carregaDados(rotulo: string) {
    this.coletaProvider.pesquisarColeta(rotulo).then(coletas => {
      console.log(coletas)
      //this.coleta = coletas;
      //if (coletas != undefined) {
        this.coleta = coletas;
        let i = 0;
        for (let c in coletas) {
          //this.coleta[i] = c;
          ////console.log("COLETA>"+JSON.stringify(this.coleta[i]));
          //this.coleta[i].diaSemana = 'Se';
         if (this.coleta[i].diaSemana == 2) {
            this.coleta[i].diaSemana = 'Segunda-feira';
          }else if (this.coleta[i].diaSemana == 3) {
            this.coleta[i].diaSemana = 'Terça-feira';
          }else if (this.coleta[i].diaSemana == 4) {
            this.coleta[i].diaSemana = 'Quarta-feira';
          }else if (this.coleta[i].diaSemana == 5) {
            this.coleta[i].diaSemana = 'Quinta-feira';
          }else if (this.coleta[i].diaSemana == 6) {
            this.coleta[i].diaSemana = 'Sexta-feira';
          }else if (this.coleta[i].diaSemana == 7) {
            this.coleta[i].diaSemana = 'Sábado';
          }else if (this.coleta[i].diaSemana == 1) {
            this.coleta[i].diaSemana = 'Domingo';
          }

          if (this.coleta[i].tipoLixo == 1) {
            this.coleta[i]['tipoLixo'] = 'Seco';
          } else if (this.coleta[i].tipoLixo == 2) {
            this.coleta[i]['tipoLixo'] = 'Úmido';
          }


          if (this.coleta[i].turno == 1) {
            this.coleta[i]['turno'] = 'Manhã';
          } else if (this.coleta[i].turno == 2) {
            this.coleta[i]['turno'] = 'Tarde';
          } else if (this.coleta[i].turno == 3) {
            this.coleta[i]['turno'] = 'Noite';
          }

          ////console.log("tipoLixo" + c['tipoLixo']);
          i++;
        }
      
    });
  }

  ionViewDidLoad() {
    ////console.log('ionViewDidLoad ColetaLocalPage');
  }

}
