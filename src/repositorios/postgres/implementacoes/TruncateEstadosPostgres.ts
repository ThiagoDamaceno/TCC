import { IRepositorioEstados } from '../../IRepositorioEstados'
import { ClientePostgres } from '../ClientePostgres'
import { AbastractRepositorioEstados } from '../../AbastractRepositorioEstados'

class TruncateEstadosPostgres extends AbastractRepositorioEstados implements IRepositorioEstados<void> {
  public queryObj: { truncateQuery: string }

  constructor () {
    super()

    const truncateQuery = `
    TRUNCATE TABLE ${this.SCHEMA_NAME};
  `
    this.queryObj = { truncateQuery }
  }

  async execute (): Promise<void> {
    const client = (new ClientePostgres()).client
    try {
      await client.connect()
      await client.query(this.queryObj.truncateQuery)
    } catch (error) {
      console.error(error)
    } finally {
      await client.end()
    }
  }
}

export { TruncateEstadosPostgres }
