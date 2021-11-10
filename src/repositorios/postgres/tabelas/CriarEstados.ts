import { ClientePostgres } from '../ClientePostgres'

class CriarEstados {
  static TABLE_NAME = 'estados'
  async createIfNotExists () {
    const client = new ClientePostgres().client
    try {
      await client.connect()

      const createTableCommand = `
        CREATE TABLE IF NOT EXISTS ${CriarEstados.TABLE_NAME} (
          id SERIAL PRIMARY KEY,
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
