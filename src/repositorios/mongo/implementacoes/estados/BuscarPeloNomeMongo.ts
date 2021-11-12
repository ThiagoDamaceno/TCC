import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorio } from '../../../IRepositorio'
import { Estado } from '../../../../modelos/Estado'
import { RepositorioEstados } from '../../../RepositorioEstados'

class BuscarPeloNomeMongo implements IRepositorio<Estado[] | undefined> {
  public queryObj: { nome: string }

  constructor (nome: string) {
    this.queryObj = { nome }
  }

  async execute (): Promise<Estado[] | undefined> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      const cursor = clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .collection(RepositorioEstados.SCHEMA_NAME)
        .find({ nome: this.queryObj.nome })

      const data = await cursor.toArray()

      const estados = data.map(data => {
        return new Estado(data.nome, data.codigoUf, data.id)
      })

      await clienteMongo.close()
      return estados
    } catch (err) {
      console.error(err)
    }
  }
}

export { BuscarPeloNomeMongo }
