import { Estado } from '../../../../modelos/Estado'
import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { RepositorioEstados } from '../../../RepositorioEstados'

class InserirVariosEstadosPostgres implements IRepositorio<void> {
  public queryObj: { insertQuery: string, values: string[] }

  constructor (estados: Estado[]) {
    let valuesInsert = ''
    estados.forEach((_estado, i) => {
      let string = `($${(i * 3) + 1}, $${(i * 3) + 2}, $${(i * 3) + 3})`

      if (i !== estados.length - 1) { string += ', ' }

      valuesInsert += string
    })

    const insertQuery = `
        INSERT INTO ${RepositorioEstados.SCHEMA_NAME} (id, nome, codigoUf) values ${valuesInsert}
      `

    const values: string[] = []
    estados.forEach(estado => {
      values.push(estado.id!)
      values.push(estado.nome)
      values.push(estado.codigoUf.toString())
    })

    this.queryObj = { insertQuery, values }
  }

  async execute (): Promise<void> {
    const client = (new ClientePostgres()).client
    client.connect()
    try {
      await client.query(this.queryObj.insertQuery, this.queryObj.values)
      await client.end()
    } catch (error) {
      console.error(error)
    }
  }
}

export { InserirVariosEstadosPostgres }
