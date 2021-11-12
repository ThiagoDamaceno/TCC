import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { Municipio } from '../../../../modelos/Municipio'
import { RepositorioMunicipios } from '../../../RepositorioMunicipios'

class BuscarMunicipiosPeloNomePostgres implements IRepositorio<Municipio[] | undefined> {
  public queryObj: { selectAllQuery: string, values: string[]}

  constructor (nomeFiltro: string) {
    const selectAllQuery = `
      SELECT * FROM ${RepositorioMunicipios.SCHEMA_NAME} WHERE nome = $1;
    `
    this.queryObj = { selectAllQuery, values: [nomeFiltro] }
  }

  async execute (): Promise<Municipio[] | undefined> {
    const client = (new ClientePostgres()).client
    try {
      await client.connect()
      const response = await client.query(this.queryObj.selectAllQuery, this.queryObj.values)

      const municipios = response.rows.map(row => {
        return new Municipio(row.codigoIbge, row.nome, row.codigoUf, row.id)
      })

      await client.end()
      return municipios
    } catch (error) {
      console.error(error)
    }
  }
}

export { BuscarMunicipiosPeloNomePostgres }
