import { Local } from "../coleta/local";

export class lev{
    private id: number;
    private nome: String;
    private endereco: Local;
    private horaFuncionamento: String;
    private diasFuncionamento: String;

    constructor(id:number, nome: String, endereco: Local, horaFuncionamento: String, diasFuncionamento: String){
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.horaFuncionamento = horaFuncionamento;
        this.diasFuncionamento = diasFuncionamento;
    }
    public getId(){return this.id;}
    public getNome(){return this.nome;}
    public getEndereco(){return this.endereco;}
    public getHoraFuncionamento(){return this.horaFuncionamento;}
    public getDiasFuncionamento(){return this.diasFuncionamento;}
    public setId(){return this.id;}
    public setNome(){return this.nome;}
    public setEndereco(){return this.endereco;}
    public setHoraFuncionamento(){return this.horaFuncionamento;}
    public setDiasFuncionamento(){return this.diasFuncionamento;}
}