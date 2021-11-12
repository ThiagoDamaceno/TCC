import { RepositorioEstados } from '../../RepositorioEstados'
import { ClientePostgres } from '../ClientePostgres'

class CriarEstados {
  async createIfNotExists () {
    const client = new ClientePostgres().client
    try {
      await client.connect()

      const createTableCommand = `
        CREATE TABLE IF NOT EXISTS ${RepositorioEstados.SCHEMA_NAME} (
          id VARCHAR(255) PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          codigoUf INT NOT NULL
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
