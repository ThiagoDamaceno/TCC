import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorio } from '../../../IRepositorio'
import { AbastractRepositorioMunicipios } from '../../../AbastractRepositorioMunicipios'

class TruncateMunicipiosMongo extends AbastractRepositorioMunicipios implements IRepositorio<void> {
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

export { TruncateMunicipiosMongo }
