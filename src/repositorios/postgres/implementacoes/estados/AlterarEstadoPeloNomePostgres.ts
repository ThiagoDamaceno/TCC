import { IRepositorioEstados } from '../../../IRepositorioEstados'
import { ClientePostgres } from '../../ClientePostgres'
import { AbastractRepositorioEstados } from '../../../AbastractRepositorioEstados'

class AlterarEstadoPeloNomePostgres extends AbastractRepositorioEstados implements IRepositorioEstados<void> {
  public queryObj: { updateQuery: string, values: string[] }

  constructor (public filter: string, public newValue: string) {
    super()

    const updateQuery = `
    UPDATE ${this.SCHEMA_NAME} SET nome = $2 WHERE nome = $1;
  `
    const values = [this.filter, this.newValue]
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

export { AlterarEstadoPeloNomePostgres }
