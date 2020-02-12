
export class Local{
    private id: number;
    private rotulo: string;
    private latitude: number;
    private longitude: number;
    private tipoLocal: any;

    constructor(id:number, rotulo: string, latitude: number, longitude: number, tipoLocal: any){
        this.id = id;
        this.rotulo = rotulo;
        this.latitude = latitude;
        this.longitude = longitude;
        this.tipoLocal = tipoLocal;
    }

    public getId(){return this.id;}
    public getRotulo(){return this.rotulo;}
    public getLatitude(){return this.latitude;}
    public getLongitude(){return this.longitude;}
    public getTipoLocal(){return this.tipoLocal;}
}