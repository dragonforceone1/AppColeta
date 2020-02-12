import { Pais } from "./pais";

//Classe Estado//

export class Estado{
    constructor(
    private id: number,
    private nome: string,
    private sigla: string,
    private pais: Pais
    ){}

    getIdentificador(){return this.id;}

    getNome(){return this.nome;}

    getSigla(){return this.sigla;}

    getPais(){return this.pais;}

    setIdentificador(identificador:number){this.id=identificador;}
    setNome(nome:string){this.nome=nome;}
    setSigla(sigla:string){this.sigla=sigla}

}