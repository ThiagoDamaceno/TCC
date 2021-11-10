import { ClienteMongo } from '../ClienteMongo'
import { IRepositorioEstados } from '../../IRepositorioEstados'
import { Estado } from '../../../modelos/Estado'
import { AbastractRepositorioEstados } from '../../AbastractRepositorioEstados'

class InserirVariosEstadosMongo extends AbastractRepositorioEstados implements IRepositorioEstados<void> {
  public queryObj: { estados: Estado[] }

  constructor (estados: Estado[]) {
    super()
    this.queryObj = { estados }
  }

  async execute (): Promise<void> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      await clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .collection(this.SCHEMA_NAME)
        .insertMany(this.queryObj.estados)
    } finally {
      await clienteMongo.close()
    }
  }
}

export { InserirVariosEstadosMongo }
