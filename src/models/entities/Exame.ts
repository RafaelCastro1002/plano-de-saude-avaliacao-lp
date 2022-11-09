import { Entity } from "./Entity";

export type TiposEspecialidade = "biópsia" | "ultrassom" | "refração" | "radiografia oclusal"

export default class Exame extends Entity {
    especialidade: TiposEspecialidade
    profissionalResponsavel: string
    dataHorario: Date
    idBeneficiario:Number
    caraterUrgencia: boolean

    constructor(especialidade: TiposEspecialidade, profissionalResponsavel: string, dataHorario: Date, idBeneficiario: number, caraterUrgencia: boolean){
        super()
        this.especialidade = especialidade
        this.profissionalResponsavel = profissionalResponsavel
        this.dataHorario = dataHorario
        this.idBeneficiario = idBeneficiario
        this.caraterUrgencia = caraterUrgencia
        
    }
}