import { Endereco } from "./endereco";
import { TipoVisibilidade } from "./tipoVisibilidade";
import { TipoUsuario } from "./tipoUsuario";

//Classe usuário//

export class Usuario{
    private id: number;
    private nome: string;
    private email: string;
    private cpf: string;
    private visibilidadeEmail: TipoVisibilidade;
    private senha: string;
    private telefone: number;
    private celular: number;
    private visibilidadeTelefones: TipoVisibilidade;
    private imagem: string;
    private visibilidadeImagem: TipoVisibilidade;
    private dataNascimento: Date;
    private visibilidadeDataNascimento: TipoVisibilidade;
    private endereco: Endereco;
    private tipoUsuario: TipoUsuario;
    private facebook: string;
    private google: string;


    constructor(
      identificador: number,
      nome: string,
      email: string,
      cpf: string,
      visibilidadeEmail: TipoVisibilidade,
      senha: string,
      telefone: number,
      celular: number,
      visibilidadeTelefones: TipoVisibilidade,
      imagem: string,
      visibilidadeImagem: TipoVisibilidade,
      dataNascimento: Date,
      visibilidadeDataNascimento: TipoVisibilidade,
      endereco: Endereco,
      tipoUsuario: TipoUsuario
      ){
        this.id = identificador;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.visibilidadeEmail = visibilidadeEmail;
        this.senha = senha;
        this.telefone = telefone;
        this.celular = celular;
        this.visibilidadeTelefones = visibilidadeTelefones;
        this.imagem =imagem;
        this.visibilidadeImagem = visibilidadeImagem;
        this.dataNascimento = dataNascimento;
        this.visibilidadeDataNascimento = visibilidadeDataNascimento;
        this.endereco = endereco;
        this.tipoUsuario = tipoUsuario;

      }

    public getIdentificador(){return this.id}
    public getNome(){return this.nome}
    public getEmail(){return this.email}
    public getCpf(){return this.cpf}
    public getCpfFormatado(){return this.cpf}
    public getVisibilidadeEmail(){return this.visibilidadeEmail}
    public getSenha(){return this.senha}
    public getTelefone(){return this.telefone}
    public getCelular(){return this.celular}
    public getvisibilidadeTelefones(){return this.visibilidadeTelefones}
    public getImagem(){return this.imagem}
    public getVisibilidadeImagem(){return this.visibilidadeImagem}
    public getDataNascimento(){return this.dataNascimento}
    public getVisibilidadeDataNascimento(){return this.visibilidadeDataNascimento}
    public getEndereco(){return this.endereco}
    public getTipoUsuario(){return this.tipoUsuario}
    public getFacebook(){return this.facebook}
    public getGoogle(){return this.google}

    public setIdentificador(identificador: number){this.id=identificador;}
    public setNome(nome:string){this.nome=nome;}
    public setEmail(email:string ){ this.email=email;}
    public setCpf(cpf:string ){ this.cpf=cpf;}
    public setVisibilidadeEmail(visibilidadeEmail: TipoVisibilidade){ this.visibilidadeEmail=visibilidadeEmail;}
    public setSenha(senha:string){ this.senha=senha;}
    public setTelefone(telefone: number){ this.telefone=telefone;}
    public setCelular(celular: number){ this.celular=celular;}
    public setvisibilidadeTelefones(visibilidadeTelefones: TipoVisibilidade){ this.visibilidadeTelefones=visibilidadeTelefones;}
    public setImagem(imagem: string){ this.imagem=imagem;}
    public setVisibilidadeImagem(visibilidadeImagem:TipoVisibilidade){ this.visibilidadeImagem=visibilidadeImagem;}
    public setDataNascimento(dataNascimento: Date){ this.dataNascimento = dataNascimento;}
    public setVisibilidadeDataNascimento(visibilidadeDataNascimento: TipoVisibilidade){ this.visibilidadeDataNascimento=visibilidadeDataNascimento;}
    public setEndereco(endereco: Endereco){ this.endereco = endereco};
    public setTipoUsuario(tipoUsuario: TipoUsuario){ this.tipoUsuario=tipoUsuario}
    public setFacebook(facebook:string ){ this.facebook=facebook;}
    public setGoogle(google:string ){ this.google=google;}

    public static cpfSemFormato(cpfS: string){
      ////console.log(cpfS);
      if(cpfS != undefined && cpfS != ""){
      return (cpfS.replace('.','')).replace('-','').replace('.','');
      
      }else{
        return "";
      }
    }

    public static mascaraCPF(v: string) {
      v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
      v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
      v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
      //de novo (para o segundo bloco de números)
      v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
      return v;
  }


  public static validarCpf(strCPF) {
    strCPF = (strCPF.replace('.','')).replace('-','');
    var Soma;
    var Resto;
    var i;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }
}
