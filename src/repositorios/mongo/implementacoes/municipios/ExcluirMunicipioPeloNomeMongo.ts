import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorio } from '../../../IRepositorio'
import { AbastractRepositorioMunicipios } from '../../../AbastractRepositorioMunicipios'

class ExcluirMunicipioPeloNomeMongo extends AbastractRepositorioMunicipios implements IRepositorio<void> {
  public queryObj: { filter: string }
  constructor (filter: string) {
    super()
    this.queryObj = { filter }
  }

  async execute (): Promise<void> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      await clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .collection(this.SCHEMA_NAME)
        .deleteMany(
          {
            nome: this.queryObj.filter
          } as Object
        )
    } finally {
      await clienteMongo.close()
    }
  }
}

export { ExcluirMunicipioPeloNomeMongo }
