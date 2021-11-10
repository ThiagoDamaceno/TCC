import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorio } from '../../../IRepositorio'
import { Estado } from '../../../../modelos/Estado'
import { AbastractRepositorioEstados } from '../../../AbastractRepositorioEstados'

class BuscarTodosEstadosMongo extends AbastractRepositorioEstados implements IRepositorio<Estado[] | undefined> {
  public queryObj = ''

  // eslint-disable-next-line no-useless-constructor
  constructor () {
    super()
  }

  async execute (): Promise<Estado[] | undefined> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      const cursor = clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .collection(this.SCHEMA_NAME)
        .find()

      const data = await cursor.toArray()

      const estados = data.map(data => {
        return new Estado(data.nome, data.regiao, data.id)
      })

      return estados
    } finally {
      await clienteMongo.close()
    }
  }
}

export { BuscarTodosEstadosMongo }
