import GenericDao from "../models/dao/GenericDAO";
import Consulta, { TiposEspecialidade } from "../models/entities/Consulta";
import { existeBeneficiarioId } from "../utils/beneficiario";
import { dataPosterior } from "../utils/data";

export const especialidades = ["oncologia" , "obstetrícia" , "oftalmologia" , "odontologia"]

export default class ConsultaController {
    async save(especialidade: string,
        nomeMedico: string,
        dataHorario: Date,
        idBeneficiario: number,
    ){

        if(!dataPosterior(dataHorario)){
            return null
        }
        if(!especialidades.includes(especialidade)){
            return null
        }
        if (await existeBeneficiarioId(idBeneficiario) === null) {
            return null
        }

        let consulta = new Consulta(
            especialidade as TiposEspecialidade,
            nomeMedico,
            dataHorario,
            idBeneficiario,
        )
        const dao = new GenericDao(Consulta)
        return dao.save(consulta)

    }
}