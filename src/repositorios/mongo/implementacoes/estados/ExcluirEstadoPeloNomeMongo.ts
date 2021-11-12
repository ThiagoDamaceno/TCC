import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorio } from '../../../IRepositorio'
import { RepositorioEstados } from '../../../RepositorioEstados'

class ExcluirEstadoPeloNomeMongo implements IRepositorio<void> {
  public queryObj: { filter: string }
  constructor (filter: string) {
    this.queryObj = { filter }
  }

  async execute (): Promise<void> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      await clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .collection(RepositorioEstados.SCHEMA_NAME)
        .deleteMany(
          {
            nome: this.queryObj.filter
          } as Object
        )
      await clienteMongo.close()
    } catch (err) {
      console.error(err)
    }
  }
}

export { ExcluirEstadoPeloNomeMongo }
