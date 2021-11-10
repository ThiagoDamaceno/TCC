import { Estado } from '../../../modelos/Estado'
import { IRepositorioEstados } from '../../IRepositorioEstados'
import { ClientePostgres } from '../ClientePostgres'
import { AbastractRepositorioEstados } from '../../AbastractRepositorioEstados'

class InserirVariosEstadosPostgres extends AbastractRepositorioEstados implements IRepositorioEstados<void> {
  public queryObj: { insertQuery: string, values: string[] }

  constructor (estados: Estado[]) {
    super()

    let valuesInsert = ''
    estados.forEach((_estado, i) => {
      let string = `($${(i * 2) + 1}, $${(i * 2) + 2})`

      if (i !== estados.length - 1) { string += ', ' }

      valuesInsert += string
    })

    const insertQuery = `
        INSERT INTO ${this.SCHEMA_NAME} (nome, regiao) values ${valuesInsert}
      `

    const values: string[] = []
    estados.forEach(estado => {
      values.push(estado.nome)
      values.push(estado.regiao)
    })

    this.queryObj = { insertQuery, values }
  }

  async execute (): Promise<void> {
    const client = (new ClientePostgres()).client
    client.connect()
    try {
      await client.query(this.queryObj.insertQuery, this.queryObj.values)
    } catch (error) {
      console.error(error)
    } finally {
      await client.end()
    }
  }
}

export { InserirVariosEstadosPostgres }
