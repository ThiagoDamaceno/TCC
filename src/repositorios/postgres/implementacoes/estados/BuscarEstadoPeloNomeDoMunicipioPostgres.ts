import { Estado } from '../../../../modelos/Estado'
import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { RepositorioEstados } from '../../../RepositorioEstados'
import { RepositorioMunicipios } from '../../../RepositorioMunicipios'

class BuscarEstadoPeloNomeDoMunicipioPostgres implements IRepositorio<Estado | undefined> {
  public queryObj: { selectAllQuery: string, values: string[]}

  constructor (nome: string) {
    const selectAllQuery = `
      SELECT ${RepositorioEstados.SCHEMA_NAME}.id, ${RepositorioEstados.SCHEMA_NAME}.nome, ${RepositorioEstados.SCHEMA_NAME}.codigoUf FROM ${RepositorioEstados.SCHEMA_NAME} INNER JOIN ${RepositorioMunicipios.SCHEMA_NAME} ON ${RepositorioMunicipios.SCHEMA_NAME}.codigoUf = ${RepositorioEstados.SCHEMA_NAME}.codigoUf WHERE ${RepositorioMunicipios.SCHEMA_NAME}.nome = $1;
    `
    this.queryObj = { selectAllQuery, values: [nome] }
  }

  async execute (): Promise<Estado | undefined> {
    const client = (new ClientePostgres()).client
    try {
      await client.connect()
      const response = await client.query(this.queryObj.selectAllQuery, this.queryObj.values)
      await client.end()
      if (response.rows.length > 0) {
        return new Estado(response.rows[0].nome, response.rows[0].codigouf, response.rows[0].id)
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export { BuscarEstadoPeloNomeDoMunicipioPostgres }
