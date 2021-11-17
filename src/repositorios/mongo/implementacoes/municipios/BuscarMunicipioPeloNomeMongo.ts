import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorio } from '../../../IRepositorio'
import { RepositorioMunicipios } from '../../../RepositorioMunicipios'
import { Municipio } from '../../../../modelos/Municipio'

class BuscarMunicipiosPeloNomeMongo implements IRepositorio<Municipio[] | undefined> {
  public queryObj: { nome: string }

  constructor (nome: string) {
    this.queryObj = { nome }
  }

  async execute (): Promise<Municipio[] | undefined> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      const cursor = clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .collection(RepositorioMunicipios.SCHEMA_NAME)
        .find({ nome: this.queryObj.nome })

      const data = await cursor.toArray()

      const municipios = data.map(data => {
        return new Municipio(data.nome, data.codigoUf, data.id)
      })

      await clienteMongo.close()
      return municipios
    } catch (err) {
      console.error(err)
    }
  }
}

export { BuscarMunicipiosPeloNomeMongo }
