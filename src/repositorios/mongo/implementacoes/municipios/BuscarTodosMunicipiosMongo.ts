import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorio } from '../../../IRepositorio'
import { Municipio } from '../../../../modelos/Municipio'
import { AbastractRepositorioMunicipios } from '../../../AbastractRepositorioMunicipios'

class BuscarTodosMunicipiosMongo extends AbastractRepositorioMunicipios implements IRepositorio<Municipio[] | undefined> {
  public queryObj = ''

  // eslint-disable-next-line no-useless-constructor
  constructor () {
    super()
  }

  async execute (): Promise<Municipio[] | undefined> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      const cursor = clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .collection(this.SCHEMA_NAME)
        .find()

      const data = await cursor.toArray()

      const municipio = data.map(data => {
        return new Municipio(data.codigoIbge, data.nome, data.latitude, data.longitude, data.codigoUf, data.ddd, data.id)
      })

      return municipio
    } finally {
      await clienteMongo.close()
    }
  }
}

export { BuscarTodosMunicipiosMongo }
