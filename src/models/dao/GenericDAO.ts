import { executeQuery } from "../../config/db";
import { Entity } from "../entities/Entity";

export default class GenericDao<T extends Entity>{
    private _tableName: string
    private _entity: new(...args: any[]) => T

    constructor(entity: new(...args: any[]) => T){
        this._entity = entity
        this._tableName = entity.name.toLocaleLowerCase()
    }
   async save (obj: T):Promise<T | null>{
    const values = this._getObjectValues(obj)
    const sqlQuery = `insert into "${this._tableName}"(${this._getAttributes(obj).map((a) => `"${a}"`).join(', ')}) values(${values.map((_, index) => `$${index + 1}`)}) returning * `
    
    //return sqlQuery
    const result = await executeQuery(sqlQuery, values)
    const instance = new this._entity()
    return result.rowCount == 1
    ? Object.assign(instance, result.rows[0]) : null
   }

   async findAll(): Promise<T[]> {
     const sqlQuery = `select * from "${this._tableName}" order by id`
     const result = await executeQuery(sqlQuery)


     const { rows } = result
     const objs: T[] = rows.map((r) => {
     const instance = new this._entity()
     Object.assign(instance, r)
          return instance
     })
     
     return objs
   }

   async findById(id: number): Promise<T | null> {
     const sqlQuery = `
          select * from "${this._tableName}" 
          where id = $1
     `

     const result = await executeQuery(sqlQuery, [id])

     const instance: T = new this._entity()

     return result.rowCount > 0 ? Object.assign(instance, result.rows[0]) : null
   }

   private _getAttributes(obj: T): string[]{
        return Object.getOwnPropertyNames(obj)
   }

   private _getObjectValues(obj: T): any[] {
        const attrs = this._getAttributes(obj)
        const values = attrs.map((a) => Reflect.get(obj, a))
        return values
   }

}
