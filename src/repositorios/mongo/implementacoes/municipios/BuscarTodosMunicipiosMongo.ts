import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorio } from '../../../IRepositorio'
import { Municipio } from '../../../../modelos/Municipio'
import { RepositorioMunicipios } from '../../../RepositorioMunicipios'

class BuscarTodosMunicipiosMongo implements IRepositorio<Municipio[] | undefined> {
  public queryObj = ''

  async execute (): Promise<Municipio[] | undefined> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      const cursor = clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .collection(RepositorioMunicipios.SCHEMA_NAME)
        .find()

      const data = await cursor.toArray()

      const municipio = data.map(data => {
        return new Municipio(data.nome, data.codigoUf, data.id)
      })

      await clienteMongo.close()
      return municipio
    } catch (err) {
      console.error(err)
    }
  }
}

export { BuscarTodosMunicipiosMongo }
