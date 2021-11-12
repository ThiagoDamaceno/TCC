import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { RepositorioMunicipios } from '../../../RepositorioMunicipios'

class TruncateMunicipiosPostgres implements IRepositorio<void> {
  public queryObj: { truncateQuery: string }

  constructor () {
    const truncateQuery = `
    TRUNCATE TABLE ${RepositorioMunicipios.SCHEMA_NAME};
  `
    this.queryObj = { truncateQuery }
  }

  async execute (): Promise<void> {
    const client = (new ClientePostgres()).client
    try {
      await client.connect()
      await client.query(this.queryObj.truncateQuery)
      await client.end()
    } catch (error) {
      console.error(error)
    }
  }
}

export { TruncateMunicipiosPostgres }
