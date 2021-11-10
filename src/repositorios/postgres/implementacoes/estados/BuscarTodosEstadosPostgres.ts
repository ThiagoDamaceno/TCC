import { Estado } from '../../../../modelos/Estado'
import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { AbastractRepositorioEstados } from '../../../AbastractRepositorioEstados'

class BuscarTodosEstadosPostgres extends AbastractRepositorioEstados implements IRepositorio<Estado[] | undefined> {
  public queryObj: { selectAllQuery: string }

  constructor () {
    super()

    const selectAllQuery = `
      SELECT * FROM ${this.SCHEMA_NAME};
    `
    this.queryObj = { selectAllQuery }
  }

  async execute (): Promise<Estado[] | undefined> {
    const client = (new ClientePostgres()).client
    try {
      await client.connect()
      const response = await client.query(this.queryObj.selectAllQuery)

      const estados = response.rows.map(row => {
        return new Estado(row.nome, row.regiao, row.id)
      })

      return estados
    } catch (error) {
      console.error(error)
    } finally {
      await client.end()
    }
  }
}

export { BuscarTodosEstadosPostgres }
