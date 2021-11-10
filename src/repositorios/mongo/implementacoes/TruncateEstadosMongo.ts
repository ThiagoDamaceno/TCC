import { ClienteMongo } from '../ClienteMongo'
import { IRepositorioEstados } from '../../IRepositorioEstados'
import { AbastractRepositorioEstados } from '../../AbastractRepositorioEstados'

class TruncateEstadosMongo extends AbastractRepositorioEstados implements IRepositorioEstados<void> {
  public queryObj: { }
  constructor () {
    super()
    this.queryObj = { }
  }

  async execute (): Promise<void> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      await clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .collection(this.SCHEMA_NAME)
        .drop()
    } finally {
      await clienteMongo.close()
    }
  }
}

export { TruncateEstadosMongo }
