import { ClientePostgres } from '../ClientePostgres'

class CriarMunicipios {
  static TABLE_NAME = 'municipios'
  async createIfNotExists () {
    const client = new ClientePostgres().client
    try {
      await client.connect()

      const createTableCommand = `
        CREATE TABLE IF NOT EXISTS ${CriarMunicipios.TABLE_NAME} (
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

export { CriarMunicipios }
