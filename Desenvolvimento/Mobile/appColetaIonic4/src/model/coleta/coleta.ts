import { DiaSemana } from "./tipoLocal";
import { TipoLixo } from "./tipoLixo";
import { Turno } from "./turno";
import { Local } from "./local";

export class Coleta{
    private id: number;
    private diaSemana: DiaSemana;
    private tipoLixo: TipoLixo;
    private turno: Turno;
    private local: Local;

    constructor(id:number, diaSemana: DiaSemana, tipoLixo: TipoLixo, turno: Turno, local: Local){
        this.id = id;
        this.diaSemana = diaSemana;
        this.tipoLixo = tipoLixo;
        this.turno = turno;
        this.local = local;
    }

    public getId(){return this.id;}
    public getDiaSemana(){return this.diaSemana;}
    public getTipoLixo(){return this.tipoLixo;}
    public getTurno(){return this.turno;}
    public getLocal(){return this.local;}
}