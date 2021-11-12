import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { RepositorioEstados } from '../../../RepositorioEstados'

class AlterarEstadoPeloNomePostgres implements IRepositorio<void> {
  public queryObj: { updateQuery: string, values: string[] }

  constructor (public filter: string, public newValue: string) {
    const updateQuery = `
    UPDATE ${RepositorioEstados.SCHEMA_NAME} SET nome = $2 WHERE nome = $1;
  `
    const values = [this.filter, this.newValue]
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

export { AlterarEstadoPeloNomePostgres }
