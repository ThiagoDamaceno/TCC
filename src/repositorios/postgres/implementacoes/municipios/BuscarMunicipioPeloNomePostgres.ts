import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { AbastractRepositorioEstados } from '../../../AbastractRepositorioEstados'
import { Municipio } from '../../../../modelos/Municipio'

class BuscarMunicipioPeloNomePostgres extends AbastractRepositorioEstados implements IRepositorio<Municipio[] | undefined> {
  public queryObj: { selectAllQuery: string, values: string[]}

  constructor (nomeFiltro: string) {
    super()

    const selectAllQuery = `
      SELECT * FROM ${this.SCHEMA_NAME} WHERE nome = $1;
    `
    this.queryObj = { selectAllQuery, values: [nomeFiltro] }
  }

  async execute (): Promise<Municipio[] | undefined> {
    const client = (new ClientePostgres()).client
    try {
      await client.connect()
      const response = await client.query(this.queryObj.selectAllQuery, this.queryObj.values)

      const municipios = response.rows.map(row => {
        return new Municipio(row.codigoIbge, row.nome, row.latitude, row.longitude, row.codigoUf, row.ddd, row.id)
      })

      return municipios
    } catch (error) {
      console.error(error)
    } finally {
      await client.end()
    }
  }
}

export { BuscarMunicipioPeloNomePostgres }
