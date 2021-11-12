import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorio } from '../../../IRepositorio'
import { RepositorioMunicipios } from '../../../RepositorioMunicipios'

class AlterarMunicipiosPeloNomeMongo implements IRepositorio<void> {
  public queryObj: { filter: string, newValue: string }
  constructor (filter: string, newValue: string) {
    this.queryObj = { filter, newValue }
  }

  async execute (): Promise<void> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      await clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .collection(RepositorioMunicipios.SCHEMA_NAME)
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
      await clienteMongo.close()
    } catch (err) {
      console.error(err)
    }
  }
}

export { AlterarMunicipiosPeloNomeMongo }
