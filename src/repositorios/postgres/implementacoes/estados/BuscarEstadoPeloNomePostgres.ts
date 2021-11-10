import { Estado } from '../../../../modelos/Estado'
import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { AbastractRepositorioEstados } from '../../../AbastractRepositorioEstados'

class BuscarEstadoPeloNomePostgres extends AbastractRepositorioEstados implements IRepositorio<Estado[] | undefined> {
  public queryObj: { selectAllQuery: string, values: string[]}

  constructor (nome: string) {
    super()

    const selectAllQuery = `
      SELECT * FROM ${this.SCHEMA_NAME} WHERE nome = $1;
    `
    this.queryObj = { selectAllQuery, values: [nome] }
  }

  async execute (): Promise<Estado[] | undefined> {
    const client = (new ClientePostgres()).client
    try {
      await client.connect()
      const response = await client.query(this.queryObj.selectAllQuery, this.queryObj.values)

      const estados = response.rows.map(row => {
        return new Estado(row.nome, row.regiao, row.id)
      })

      return estados
    } catch (error) {
      console.error(error)
    } finally {
      await client.end()
    }
  }
}

export { BuscarEstadoPeloNomePostgres }
