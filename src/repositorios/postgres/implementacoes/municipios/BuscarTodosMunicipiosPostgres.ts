import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { RepositorioMunicipios } from '../../../RepositorioMunicipios'
import { Municipio } from '../../../../modelos/Municipio'

class BuscarTodosMunicipiosPostgres implements IRepositorio<Municipio[] | undefined> {
  public queryObj: { selectAllQuery: string }

  constructor () {
    const selectAllQuery = `
      SELECT * FROM ${RepositorioMunicipios.SCHEMA_NAME};
    `
    this.queryObj = { selectAllQuery }
  }

  async execute (): Promise<Municipio[] | undefined> {
    const client = (new ClientePostgres()).client
    try {
      await client.connect()
      const response = await client.query(this.queryObj.selectAllQuery)

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

export { BuscarTodosMunicipiosPostgres }
