import { AbastractRepositorioMunicipios } from '../../AbastractRepositorioMunicipios'
import { ClientePostgres } from '../ClientePostgres'

class CriarMunicipios extends AbastractRepositorioMunicipios {
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
          codigoIbge VARCHAR(255) NOT NULL,
          nome VARCHAR(255) NOT NULL,
          latitude VARCHAR(255) NOT NULL,
          longitude VARCHAR(255) NOT NULL,
          codigoUf INT NOT NULL,
          ddd INT NOT NULL
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
