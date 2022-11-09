import { Entity } from "./Entity";

export type TiposEspecialidade = "oncologia" | "obstetrícia" | "oftalmologia" | "odontologia"

export default class Consulta extends Entity {
    especialidade: TiposEspecialidade
    nomeMedico: string
    dataHorario: Date
    idBeneficiario: number
    
    constructor(especialidade: TiposEspecialidade, nomeMedico: string, dataHorario: Date, idBeneficiario: number){        
        super()
        this.especialidade = especialidade
        this.nomeMedico = nomeMedico
        this.dataHorario = dataHorario
        this.idBeneficiario = idBeneficiario
    }
}