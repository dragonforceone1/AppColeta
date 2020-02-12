//Classe endereço//
import {TipoVisibilidade} from "./tipoVisibilidade";
import { Municipio } from "./municipio";

export class Endereco{
    constructor(
    private logradouro: string,
    private numero: number,
    private bairro: string,
    private visibilidadeMunicipio: TipoVisibilidade,
    private visibilidadeEstado: TipoVisibilidade,
    private visibilidadePais: TipoVisibilidade,
    private municipio: Municipio
    ){}

    getLogradouro(){return this.logradouro ;}
    getNumero(){return this.numero;}
    getBairro(){return this.bairro ;}
    getVisibilidadeMunicipio(){return this.visibilidadeMunicipio ;}
    getVisibilidadeEstado(){return this.visibilidadeEstado ;}
    getVisibilidadePais(){return this.visibilidadePais ;}
    getMunicipio(){return this.municipio;}

    setLogradouro(logradouro: string){this.logradouro=logradouro ;}
    setNumero(numero:number){ this.numero = numero;}
    setBairro(bairro: string ){ this.bairro = bairro ;}
    setVisibilidadeMunicipio(visibilidadeMunicipio: TipoVisibilidade){ this.visibilidadeMunicipio = visibilidadeMunicipio ;}
    setVisibilidadeEstado(visibilidadeEstado: TipoVisibilidade){ this.visibilidadeEstado=visibilidadeEstado;}
    setVisibilidadePais(visibilidadePais: TipoVisibilidade){ this.visibilidadePais=visibilidadePais ;}
    setMunicipio(municipio: Municipio){ this.municipio=municipio;}
}