// Classe pais//

export class Pais{
    constructor(
        private id: number,
        private nome: string,
        private sigla: string){}

    getIdentificador(){return this.id;}
    getNome(){return this.nome;}
    getSigla(){return this.sigla;}

    setIdentificador(identificador:number){this.id=identificador;}
    setNome(nome:string){this.nome=nome;}
    setSigla(sigla:string){this.sigla=sigla}

}

