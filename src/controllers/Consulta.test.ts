import { createTables, executeQuery } from "../config/db"
import { pegarIdDeAlgumBenficiario } from "../utils/beneficiario"
import ConsultaController from "./Consulta"

describe('Testando ConsultaController', () => {
    beforeAll(async () => await createTables())

    it('deve salvar uma nova consulta', async () => {
        const idBeneficiario = await pegarIdDeAlgumBenficiario()

        const consultaController = new ConsultaController()
        const savedConsulta = await consultaController.save(
            'oncologia', 
            'Larissa Lopes', 
            new Date(2022, 11, 10), 
            idBeneficiario, 
        )

        expect(savedConsulta).not.toBe(null)
    })

    it('não deve salvar uma nova consulta com especialidade invalida', async () => {
        const idBeneficiario = await pegarIdDeAlgumBenficiario()

        const consultaController = new ConsultaController()
        const savedConsulta = await consultaController.save(
            'caracas', 
            'Larissa Lopes', 
            new Date(2022, 11, 10), 
            idBeneficiario, 
        )

        expect(savedConsulta).toBe(null)
    })

    it('não deve salvar uma nova consulta com uma data e horário anterior ao instante atual', async () => {
        const idBeneficiario = await pegarIdDeAlgumBenficiario()

        const consultaController = new ConsultaController()
        const savedConsulta = await consultaController.save(
            'oncologia', 
            'Larissa Lopes', 
            new Date(2022, 10, 8, 21, 0, 0), 
            idBeneficiario, 
        )

        expect(savedConsulta).toBe(null)
    })
})
