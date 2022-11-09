import { Entity } from "./Entity"

export default class Beneficiario extends Entity {
    nome: string
    endereco: string
    dataNascimento: Date
    email: string
    telefone: string

    constructor(nome: string, endereco: string, dataNascimento: Date, email: string, telefone: string){
        super()
        this.nome = nome
        this.endereco = endereco
        this.dataNascimento = dataNascimento
        this.email = email
        this.telefone = telefone
    }
}