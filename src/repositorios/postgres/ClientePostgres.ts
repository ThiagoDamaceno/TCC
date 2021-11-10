import { Client } from 'pg'

import * as dotenv from 'dotenv'
dotenv.config()

class ClientePostgres {
  public client
  public constructor () {
    this.client = new Client({
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT as unknown as number,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD as unknown as string
    })
  }
}

export { ClientePostgres }
