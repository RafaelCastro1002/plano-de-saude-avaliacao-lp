import GenericDao from "../models/dao/GenericDAO";
import Beneficiario from "../models/entities/Beneficiario";
import { dataAnteriorHoje } from "../utils/data";

export default class BeneficiarioController {
    save(beneficiario: Beneficiario){
        console.log("beneficiario: ", beneficiario);
        
        if(!dataAnteriorHoje(beneficiario.dataNascimento)){
            return null
        }
        const dao = new GenericDao(Beneficiario)
        return dao.save(beneficiario)

    }
}