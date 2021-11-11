import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { AbastractRepositorioMunicipios } from '../../../AbastractRepositorioMunicipios'

class ExcluirMunicipioPeloNomePostgres extends AbastractRepositorioMunicipios implements IRepositorio<void> {
  public queryObj: { updateQuery: string, values: string[] }

  constructor (nomeFiltro: string) {
    super()

    const updateQuery = `
      DELETE ${this.SCHEMA_NAME} WHERE nome = $1;
    `
    const values = [nomeFiltro]
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

export { ExcluirMunicipioPeloNomePostgres }
