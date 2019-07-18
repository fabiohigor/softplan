import {Endereco} from './endereco';


export class Pessoa{
    id: Number;
    cpf: String;
    nome: String;
    sexo: String;
    email: String;
    dtnascimento: Date;
    naturalidade: String;
    nacionalidade: String;
    numero: Number;
    endereco: Endereco;
    dtcadastro: Date;
    dtAlteracao: Date;
}
