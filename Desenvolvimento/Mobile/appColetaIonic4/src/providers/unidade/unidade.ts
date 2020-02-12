import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServidorProvider } from '../servidor/servidor';
import { Unidade } from '../../model/associacao_levs/unidade';

/*
  Generated class for the UnidadeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UnidadeProvider {

  constructor(public http: HttpClient, private servidor: ServidorProvider) {
    console.log('Hello UnidadeProvider Provider');
    
  }

  public pesquisaUnidade(nomeUnidade: string):any{
    var data = {nome: nomeUnidade}

    return new Promise((resolve, reject) => {
      this.servidor.enviarRequisicao(data, "exibirUnidade/").then(resposta => {
        var retorno: Unidade[];
        retorno = [];

        resolve(resposta);
        return resposta;
      });
    });
  }

  public pesquisarLEV(nomeLEV: string):any{
    var data = {nome: nomeLEV}

    return new Promise((resolve, reject) => {
      this.servidor.enviarRequisicao(data, "exibirLev/").then(resposta => {
        var retorno: Unidade[];
        retorno = [];

        resolve(resposta);
        return resposta;
      });
    });
  }
}
