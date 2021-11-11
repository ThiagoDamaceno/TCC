import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { AbastractRepositorioMunicipios } from '../../../AbastractRepositorioMunicipios'
import { Municipio } from '../../../../modelos/Municipio'

class BuscarTodosMunicipiosPostgres extends AbastractRepositorioMunicipios implements IRepositorio<Municipio[] | undefined> {
  public queryObj: { selectAllQuery: string }

  constructor () {
    super()

    const selectAllQuery = `
      SELECT * FROM ${this.SCHEMA_NAME};
    `
    this.queryObj = { selectAllQuery }
  }

  async execute (): Promise<Municipio[] | undefined> {
    const client = (new ClientePostgres()).client
    try {
      await client.connect()
      const response = await client.query(this.queryObj.selectAllQuery)

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

export { BuscarTodosMunicipiosPostgres }
