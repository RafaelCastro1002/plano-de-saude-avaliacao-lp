import * as dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const sqlPool = new Pool({
    host: process.env.HOST,
    port: Number(process.env.PORT),
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
})

export const createTables = async () => {
    const client = await sqlPool.connect()

    try {
        await client.query('BEGIN')
            await client.query(`
            create table if not exists "beneficiario" (
                "id" serial primary key,
                "nome" varchar not null,
                "endereco" varchar not null,
                "dataNascimento" date not null,
                "email" varchar,
                "telefone" varchar not null
                
            )`)

            await client.query(`
            create table if not exists "consulta" (
                "id" serial primary key,
                "especialidade" varchar not null,
                "nomeMedico" varchar not null,
                "dataHorario" timestamp not null,
                "idBeneficiario" integer not null,
                constraint fk_consulta_beneficiario
                    foreign key("idBeneficiario")
                        references beneficiario("id")
            )`)

            await client.query(`
            create table if not exists "exame" (
                "id" serial primary key,
                "especialidade" varchar not null,
                "profissionalResponsavel" varchar not null,
                "dataHorario" date not null,
                "caraterUrgencia" boolean,
                "idBeneficiario" integer not null,
                constraint fk_exame_beneficiario
                    foreign key("idBeneficiario")
                        references beneficiario("id")
            )`)


        await client.query('COMMIT')
    } catch(err) {
        await client.query('ROLLBACK')
        console.log(err);
        
    }
    console.log('Feito')
    client.release()

    
}
    export const executeQuery = async (query: string, values?: any[]) => {
        const result = values 
        ? await sqlPool.query(query, values)
        : await sqlPool.query(query)

        return result
    }

process.on('SIGINT', async () => {
    await sqlPool.end()
    console.log('Connection to db closed')
})
