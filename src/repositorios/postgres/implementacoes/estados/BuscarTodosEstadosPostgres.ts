import { Estado } from '../../../../modelos/Estado'
import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { RepositorioEstados } from '../../../RepositorioEstados'

class BuscarTodosEstadosPostgres implements IRepositorio<Estado[] | undefined> {
  public queryObj: { selectAllQuery: string }

  constructor () {
    const selectAllQuery = `
      SELECT * FROM ${RepositorioEstados.SCHEMA_NAME};
    `
    this.queryObj = { selectAllQuery }
  }

  async execute (): Promise<Estado[] | undefined> {
    const client = (new ClientePostgres()).client
    try {
      await client.connect()
      const response = await client.query(this.queryObj.selectAllQuery)

      const estados = response.rows.map(row => {
        return new Estado(row.nome, row.codigoUf, row.id)
      })

      await client.end()
      return estados
    } catch (error) {
      console.error(error)
    }
  }
}

export { BuscarTodosEstadosPostgres }
