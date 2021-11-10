import { IRepositorioEstados } from '../../../IRepositorioEstados'
import { ClientePostgres } from '../../ClientePostgres'
import { AbastractRepositorioEstados } from '../../../AbastractRepositorioEstados'

class ExcluirEstadoPeloNomePostgres extends AbastractRepositorioEstados implements IRepositorioEstados<void> {
  public queryObj: { updateQuery: string, values: string[] }

  constructor (public filter: string) {
    super()

    const updateQuery = `
      DELETE ${this.SCHEMA_NAME} WHERE nome = $1;
    `
    const values = [this.filter]
    this.queryObj = { updateQuery, values }
  }

  async execute (): Promise<void> {
    const client = (new ClientePostgres()).client
    try {
      await client.connect()
      await client.query(this.queryObj.updateQuery, this.queryObj.values)
    } catch (error) {
      console.error(error)
    } finally {
      await client.end()
    }
  }
}

export { ExcluirEstadoPeloNomePostgres }
