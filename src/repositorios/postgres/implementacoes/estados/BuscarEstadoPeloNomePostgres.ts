import { Estado } from '../../../../modelos/Estado'
import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { RepositorioEstados } from '../../../RepositorioEstados'

class BuscarEstadoPeloNomePostgres implements IRepositorio<Estado[] | undefined> {
  public queryObj: { selectAllQuery: string, values: string[]}

  constructor (nome: string) {
    const selectAllQuery = `
      SELECT * FROM ${RepositorioEstados.SCHEMA_NAME} WHERE nome = $1;
    `
    this.queryObj = { selectAllQuery, values: [nome] }
  }

  async execute (): Promise<Estado[] | undefined> {
    const client = (new ClientePostgres()).client
    try {
      await client.connect()
      const response = await client.query(this.queryObj.selectAllQuery, this.queryObj.values)

      const estados = response.rows.map(row => {
        return new Estado(row.nome, row.codigoUf, row.id)
      })

      await client.end()
      return estados
    } catch (error) {
      console.error(error)
    }
  }
}

export { BuscarEstadoPeloNomePostgres }
