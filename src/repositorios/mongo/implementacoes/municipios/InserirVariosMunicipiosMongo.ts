import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorio } from '../../../IRepositorio'
import { Municipio } from '../../../../modelos/Municipio'
import { RepositorioMunicipios } from '../../../RepositorioMunicipios'

class InserirVariosMunicipiosMongo implements IRepositorio<void> {
  public queryObj: { municipios: Municipio[] }

  constructor (municipios: Municipio[]) {
    this.queryObj = { municipios }
  }

  async execute (): Promise<void> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      await clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .collection(RepositorioMunicipios.SCHEMA_NAME)
        .insertMany(this.queryObj.municipios)
      await clienteMongo.close()
    } catch (err) {
      console.error(err)
    }
  }
}

export { InserirVariosMunicipiosMongo }
