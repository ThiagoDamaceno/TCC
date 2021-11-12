import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorio } from '../../../IRepositorio'
import { Estado } from '../../../../modelos/Estado'
import { RepositorioEstados } from '../../../RepositorioEstados'

class InserirVariosEstadosMongo implements IRepositorio<void> {
  public queryObj: { estados: Estado[] }

  constructor (estados: Estado[]) {
    this.queryObj = { estados }
  }

  async execute (): Promise<void> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      await clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .collection(RepositorioEstados.SCHEMA_NAME)
        .insertMany(this.queryObj.estados)
      await clienteMongo.close()
    } catch (err) {
      console.error(err)
    }
  }
}

export { InserirVariosEstadosMongo }
