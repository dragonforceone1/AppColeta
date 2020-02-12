export class Associacao{
    private id: number;
    private nome: String;
    private logo: String;
    private cnpj: String;
    private anoFundacao: Date;
    private descricao: String;
    private fotoCatadores: String;

    constructor(id:number, nome: String, logo: String, cnpj: String, anoFundacao: Date, descricao: String, fotoCatadores: String ){
        this.id = id;
        this.nome = nome;
        this.logo = logo;
        this.cnpj = cnpj;
        this.anoFundacao = anoFundacao;
        this.descricao = descricao;
        this.fotoCatadores = fotoCatadores;
    }
    public getId(){return this.id;}
    public getNome(){return this.nome;}
    public getLogo(){return this.logo;}
    public getCnpj(){return this.cnpj;}
    public getAnoFundacao(){return this.anoFundacao;}
    public getDescricao(){return this.descricao;}
    public getFotoCatadores(){return this.fotoCatadores;}
    public setId(){return this.id;}
    public setNome(){return this.nome;}
    public setLogo(){return this.logo;}
    public setCnpj(){return this.cnpj;}
    public setAnoFundacao(){return this.anoFundacao;}
    public setDescricao(){return this.descricao;}
    public setFotoCatadores(){return this.fotoCatadores;}
}