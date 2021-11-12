import { RepositorioMunicipios } from '../../RepositorioMunicipios'
import { ClientePostgres } from '../ClientePostgres'

class CriarMunicipios {
  async createIfNotExists () {
    const client = new ClientePostgres().client
    try {
      await client.connect()

      const createTableCommand = `
        CREATE TABLE IF NOT EXISTS ${RepositorioMunicipios.SCHEMA_NAME} (
          id VARCHAR(255) PRIMARY KEY,
          codigoIbge VARCHAR(255) NOT NULL,
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

export { CriarMunicipios }
