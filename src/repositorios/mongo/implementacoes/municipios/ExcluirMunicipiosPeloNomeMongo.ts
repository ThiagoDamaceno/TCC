import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorio } from '../../../IRepositorio'
import { RepositorioMunicipios } from '../../../RepositorioMunicipios'

class ExcluirMunicipiosPeloNomeMongo implements IRepositorio<void> {
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
        .collection(RepositorioMunicipios.SCHEMA_NAME)
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

export { ExcluirMunicipiosPeloNomeMongo }
