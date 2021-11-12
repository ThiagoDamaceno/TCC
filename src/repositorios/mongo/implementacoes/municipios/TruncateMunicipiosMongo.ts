import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorio } from '../../../IRepositorio'
import { RepositorioMunicipios } from '../../../RepositorioMunicipios'

class TruncateMunicipiosMongo implements IRepositorio<void> {
  public queryObj: { }
  constructor () {
    this.queryObj = { }
  }

  async execute (): Promise<void> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      const collections = await clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .listCollections()
        .toArray()

      collections.forEach(async c => {
        if (c.name === RepositorioMunicipios.SCHEMA_NAME) {
          const clienteMongo2 = (new ClienteMongo()).client
          clienteMongo2.connect()
          await clienteMongo2
            .db(process.env.MONGO_INIT_DB)
            .collection(RepositorioMunicipios.SCHEMA_NAME)
            .drop()
          clienteMongo2.close()
        }
      })
      await clienteMongo.close()
    } catch (err) {
      console.error(err)
    }
  }
}

export { TruncateMunicipiosMongo }
