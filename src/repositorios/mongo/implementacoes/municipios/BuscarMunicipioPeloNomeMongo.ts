import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorio } from '../../../IRepositorio'
import { AbastractRepositorioMunicipios } from '../../../AbastractRepositorioMunicipios'
import { Municipio } from '../../../../modelos/Municipio'

class BuscarMunicipiosPeloNomeMongo extends AbastractRepositorioMunicipios implements IRepositorio<Municipio[] | undefined> {
  public queryObj: { nome: string }

  constructor (nome: string) {
    super()

    this.queryObj = { nome }
  }

  async execute (): Promise<Municipio[] | undefined> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      const cursor = clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .collection(this.SCHEMA_NAME)
        .find({ nome: this.queryObj.nome })

      const data = await cursor.toArray()

      const municipios = data.map(data => {
        return new Municipio(data.codigoIbge, data.nome, data.latitude, data.longitude, data.codigoUf, data.ddd, data.id)
      })

      return municipios
    } finally {
      await clienteMongo.close()
    }
  }
}

export { BuscarMunicipiosPeloNomeMongo }
