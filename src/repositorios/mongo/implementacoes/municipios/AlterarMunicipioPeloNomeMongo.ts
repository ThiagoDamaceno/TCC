import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorio } from '../../../IRepositorio'
import { AbastractRepositorioMunicipios } from '../../../AbastractRepositorioMunicipios'

class AlterarMunicipioPeloNomeMongo extends AbastractRepositorioMunicipios implements IRepositorio<void> {
  public queryObj: { filter: string, newValue: string }
  constructor (filter: string, newValue: string) {
    super()
    this.queryObj = { filter, newValue }
  }

  async execute (): Promise<void> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      await clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .collection(this.SCHEMA_NAME)
        .updateMany(
          {
            nome: this.queryObj.filter
          } as Object,
          {
            $set: {
              nome: this.queryObj.newValue
            }
          } as Object
        )
    } finally {
      await clienteMongo.close()
    }
  }
}

export { AlterarMunicipioPeloNomeMongo }
