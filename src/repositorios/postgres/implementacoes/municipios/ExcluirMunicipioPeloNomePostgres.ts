import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { RepositorioMunicipios } from '../../../RepositorioMunicipios'

class ExcluirMunicipioPeloNomePostgres implements IRepositorio<void> {
  public queryObj: { updateQuery: string, values: string[] }

  constructor (nomeFiltro: string) {
    const updateQuery = `
      DELETE FROM ${RepositorioMunicipios.SCHEMA_NAME} WHERE nome = $1;
    `
    const values = [nomeFiltro]
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

export { ExcluirMunicipioPeloNomePostgres }
