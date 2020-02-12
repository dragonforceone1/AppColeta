import { Local } from "../coleta/local";
import { Associacao } from "./associacao";

export class Unidade{
    private id: number;
    private nome: String;
    private endereco: Local;
    private associacao: Associacao;
    private horarioFuncionamento: String;
    private diasFuncionamento: String;
    private sede: Boolean;

    constructor(id:number, nome: String, endereco: Local, associacao: Associacao, horarioFuncionamento: String, diasFuncionamento: String, sede: Boolean ){
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.associacao = associacao;
        this.horarioFuncionamento = horarioFuncionamento;
        this.diasFuncionamento = diasFuncionamento;
        this.sede = sede;
    }
    public getId(){return this.id;}
    public getNome(){return this.nome;}
    public getEndereco(){return this.endereco;}
    public getAssociacao(){return this.associacao;}
    public getHorarioFuncionamento(){return this.horarioFuncionamento;}
    public getDiasFuncionamento(){return this.diasFuncionamento;}
    public getSede(){return this.sede;}
    public setId(){return this.id;}
    public setNome(){return this.nome;}
    public setEndereco(){return this.endereco;}
    public setAssociacao(){return this.associacao;}
    public setHorarioFuncionamento(){return this.horarioFuncionamento;}
    public setDiasFuncionamento(){return this.diasFuncionamento;}
    public setSede(){return this.sede;}
}