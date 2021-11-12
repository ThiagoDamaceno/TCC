import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { RepositorioEstados } from '../../../RepositorioEstados'

class ExcluirEstadoPeloNomePostgres implements IRepositorio<void> {
  public queryObj: { updateQuery: string, values: string[] }

  constructor (public filter: string) {
    const updateQuery = `
      DELETE FROM ${RepositorioEstados.SCHEMA_NAME} WHERE nome = $1;
    `
    const values = [this.filter]
    this.queryObj = { updateQuery, values }
  }

  async execute (): Promise<void> {
    const client = (new ClientePostgres()).client
    try {
      await client.connect()
      await client.query(this.queryObj.updateQuery, this.queryObj.values)
      await client.end()
    } catch (error) {
      console.error(error)
    }
  }
}

export { ExcluirEstadoPeloNomePostgres }
