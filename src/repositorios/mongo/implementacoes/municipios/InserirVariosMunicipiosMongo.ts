import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorio } from '../../../IRepositorio'
import { Municipio } from '../../../../modelos/Municipio'
import { AbastractRepositorioMunicipios } from '../../../AbastractRepositorioMunicipios'

class InserirVariosMunicipiosMongo extends AbastractRepositorioMunicipios implements IRepositorio<void> {
  public queryObj: { municipios: Municipio[] }

  constructor (municipios: Municipio[]) {
    super()
    this.queryObj = { municipios }
  }

  async execute (): Promise<void> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      await clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .collection(this.SCHEMA_NAME)
        .insertMany(this.queryObj.municipios)
    } finally {
      await clienteMongo.close()
    }
  }
}

export { InserirVariosMunicipiosMongo }
