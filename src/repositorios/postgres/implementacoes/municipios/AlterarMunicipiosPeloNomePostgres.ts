import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { RepositorioMunicipios } from '../../../RepositorioMunicipios'

class AlterarMunicipiosPeloNomePostgres implements IRepositorio<void> {
  public queryObj: { updateQuery: string, values: string[] }

  constructor (filter: string, public newValue: string) {
    const updateQuery = `
    UPDATE ${RepositorioMunicipios.SCHEMA_NAME} SET nome = $1 WHERE nome = $2;
  `
    const values = [this.newValue, filter]
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

export { AlterarMunicipiosPeloNomePostgres }
