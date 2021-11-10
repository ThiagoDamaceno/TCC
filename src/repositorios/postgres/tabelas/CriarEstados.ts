import { AbastractRepositorioEstados } from '../../AbastractRepositorioEstados'
import { ClientePostgres } from '../ClientePostgres'

class CriarEstados extends AbastractRepositorioEstados {
  // eslint-disable-next-line no-useless-constructor
  constructor () {
    super()
  }

  async createIfNotExists () {
    const client = new ClientePostgres().client
    try {
      await client.connect()

      const createTableCommand = `
        CREATE TABLE IF NOT EXISTS ${this.SCHEMA_NAME} (
          id VARCHAR(255) PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          regiao VARCHAR(255) NOT NULL
        );
      `
      await client.query(createTableCommand)
    } catch (error) {
      console.error(error)
    } finally {
      await client.end()
    }
  }
}

export { CriarEstados }
