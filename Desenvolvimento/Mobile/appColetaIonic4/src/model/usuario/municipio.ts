import { Estado } from "./estado";

// Classe municipio//

export class Municipio{
    constructor(
    private id: number,
    private nome: string,
    private estado: Estado
    ){}

    getIdentificador(){return this.id;}
    getNome(){return this.nome;}
    getEstado(){return this.estado;}
    setIdentificador(identificador: number){this.id=identificador;}
    setNome(nome:string){this.nome=nome}
    setEstado(estado: Estado){this.estado=estado};
}