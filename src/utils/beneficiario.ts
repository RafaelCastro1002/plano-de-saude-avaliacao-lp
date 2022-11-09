import GenericDao from "../models/dao/GenericDAO"
import Beneficiario from "../models/entities/Beneficiario"

export const existeBeneficiarioId = (idBeneficiario: number) => {
    const dao = new GenericDao(Beneficiario)

    return dao.findById(idBeneficiario)
}

export const pegarIdDeAlgumBenficiario = async () => {
    const dao = new GenericDao(Beneficiario)

    const beneficiarios = await dao.findAll()

    console.log('list beneficia: ', beneficiarios);
    

    return beneficiarios[0].id as number
}