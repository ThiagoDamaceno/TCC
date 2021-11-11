import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { AbastractRepositorioMunicipios } from '../../../AbastractRepositorioMunicipios'

class TruncateMunicipiosPostgres extends AbastractRepositorioMunicipios implements IRepositorio<void> {
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

export { TruncateMunicipiosPostgres }
