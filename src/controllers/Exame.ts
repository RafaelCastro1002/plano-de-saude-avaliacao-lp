import GenericDao from "../models/dao/GenericDAO";
import Exame, { TiposEspecialidade } from "../models/entities/Exame";
import { existeBeneficiarioId } from "../utils/beneficiario";
import { dataPosterior } from "../utils/data";

export const especialidades = ["biópsia" , "ultrassom" , "refração" , "radiografia oclusal"]

export default class ExameController {
    async save(especialidade: string,
        profissionalResponsavel: string,
        dataHorario: Date,
        idBeneficiario:number,
        caraterUrgencia: boolean = false){
        
        if(!dataPosterior(dataHorario)){
            return null
        }
        if(!especialidades.includes(especialidade)){
            return null
        }
        if (await existeBeneficiarioId(idBeneficiario) === null) {
            return null
        }

        let consulta = new Exame(
            especialidade as TiposEspecialidade,
            profissionalResponsavel,
            dataHorario,
            idBeneficiario,
            caraterUrgencia
        )
        const dao = new GenericDao(Exame)
        return dao.save(consulta)

    }
}