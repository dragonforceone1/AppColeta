import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Local } from '../model/coleta/local';
import { ServidorProvider } from './servidor/servidor';
import { Coleta } from '../model/coleta/coleta';

/*
  Generated class for the ControladorColetaProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ControladorColetaProvider {

  constructor(public http: HttpClient, private servidor: ServidorProvider) {
    //console.log('Hello ControladorColetaProvider Provider');
  }


  public pesquisarColeta(rotulo: string):any {
    var data = {local: rotulo};

    //console.log("ENVIANDO: ", JSON.stringify(data));

    return new Promise((resolve, reject) => {
      this.servidor.enviarRequisicao(data, "pesquisarColeta/").then(resposta => {
        var retorno: Coleta[];
        retorno = [];
        
        
        /*let i = 0;
        for (let local of resposta) {
          //console.log("-", local['id']);
          let a = new Local(parseInt(local['id']), local['rotulo'], local['latitude'], local['longitude'], local['rotulo']);
          retorno[i] = a;
          //console.log("===", a);
          i++;
        }*/
        resolve(resposta);
        return resposta;
      });
    });

  }

  public pesquisarLocaisProximos(latitude: number, longitude: number, tipo: number): any {
    var data = {
      latitude: latitude,
      longitude: longitude,
      raio: 2,
      tipo: tipo,
      /* Tipos:
        1 - Coleta
        != 1 - Associações e LEVs
      */
    };

    return new Promise((resolve, reject) => {
      this.servidor.enviarRequisicao(data, "visualizarLocalProximos/").then(resposta => {
        var retorno: Local[];
        retorno = [];
        //console.log("Resposta Locais: ", resposta);
        let i = 0;
        for (let local of resposta) {
          //console.log("-", local['id']);
          let a = new Local(parseInt(local['id']), local['rotulo'], local['latitude'], local['longitude'], local['tipoLocal']);

          retorno[i] = a;
          //console.log("===", a);
          i++;
        }
        resolve(retorno);
        return retorno;
      });
    });

  }

}