import { createTables } from "../config/db"
import { pegarIdDeAlgumBenficiario } from "../utils/beneficiario"
import ConsultaController from "./Consulta"
import ExameController from "./Exame"

describe('Testando ExameController', () => {
    beforeAll(async () => await createTables())

    it('deve salvar uma nova exame', async () => {
        const idBeneficiario = await pegarIdDeAlgumBenficiario()

        const exameController = new ExameController()
        const savedExame = await exameController.save(
            'ultrassom', 
            'Larissa Lopes', 
            new Date(2022, 11, 10), 
            idBeneficiario,
            true
        )

        expect(savedExame).not.toBe(null)
    })

    it('não deve salvar um novo exame com especialidade invalida', async () => {
        const idBeneficiario = await pegarIdDeAlgumBenficiario()

        const exameController = new ExameController()
        const savedExame = await exameController.save(
            'eletrocardiograma', 
            'Larissa Lopes', 
            new Date(2022, 11, 10), 
            idBeneficiario,
            true
        )

        expect(savedExame).toBe(null)
    })

    it('não deve salvar uma nova consulta com uma data e horário anterior ao instante atual', async () => {
        const idBeneficiario = await pegarIdDeAlgumBenficiario()

        const exameController = new ExameController()
        const savedExame = await exameController.save(
            'ultrassom', 
            'Larissa Lopes', 
            new Date(2022, 10, 8, 21, 0, 0), 
            idBeneficiario,
            true
        )
            
            
        expect(savedExame).toBe(null)
    })
})
