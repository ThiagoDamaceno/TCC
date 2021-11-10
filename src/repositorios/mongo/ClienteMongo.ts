import { MongoClient } from 'mongodb'

import * as dotenv from 'dotenv'
dotenv.config()

class ClienteMongo {
  public client
  constructor () {
    const mongoUser = process.env.MONGO_INIT_ROOT_USERNAME
    const mongoPassword = process.env.MONGO_INIT_ROOT_PASSWORD
    const mongoHost = process.env.MONGO_HOST
    const mongoPort = process.env.MONGO_PORT

    const url = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}`
    this.client = new MongoClient(url)
  }
}

export { ClienteMongo }
