import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServidorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServidorProvider {


  public URL: string = "https://irr-project-2019.appspot.com/";
  public options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'ApiKey setapp:c701f46aa9973b6102ba1d2828d3d2e8551e9eb7'
    })
  };
  public linkImg = "";

  constructor(public http: HttpClient) {
    //console.log('Hello ServidorProvider Provider');
  }

  public enviarRequisicao(data: any, tipo: string): any {
    return new Promise((resolve, reject) => {

      //alert(JSON.stringify(data) + "para: "+this.URL + tipo);
      this.http.post(this.URL + tipo, JSON.stringify(data), this.options)
        .subscribe((result: any) => {
          //console.log("RESULTADO REQUISIÇÃO: ", result);
          resolve(result); //retorna o que recebeu da API

        },
          (error) => {
            //alert("Erro ao conectar com servidor!");
            resolve(false);

            // reject(error);
          });

    });
  }

}
