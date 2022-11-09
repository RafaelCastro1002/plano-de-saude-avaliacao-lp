import { createTables, executeQuery } from "../config/db"
import Beneficiario from "../models/entities/Beneficiario"
import BeneficiarioController from "./Beneficiario"

describe('Testando BeneficiarioController', () => {
    beforeAll(async () => await createTables())

    it('deve salvar um novo beneficiario', async () => {
        let beneficiario: Beneficiario = new Beneficiario('Rafael', 'Rua Travessa C', new Date(2001, 6, 23), 'rafael@email.com', '999999999')

        console.log("Test beneficiario: ", beneficiario);
        

        const beneficiarioController = new BeneficiarioController()
        const savedBeneficiario = await beneficiarioController.save(beneficiario)

        expect(savedBeneficiario).not.toBe(null)
    })

    it('Não deve salvar um novo beneficiario', async () => {
        let beneficiario: Beneficiario = new Beneficiario('Rafael', 'Rua Travessa C', new Date(2022, 11, 9), 'rafael@email.com', '999999999')

        console.log("Test beneficiario: ", beneficiario);
        

        const beneficiarioController = new BeneficiarioController()
        const savedBeneficiario = await beneficiarioController.save(beneficiario)

        expect(savedBeneficiario).toBe(null)
    })
})
