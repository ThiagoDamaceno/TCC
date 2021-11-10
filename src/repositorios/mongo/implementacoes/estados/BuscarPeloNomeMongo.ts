import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorioEstados } from '../../../IRepositorioEstados'
import { Estado } from '../../../../modelos/Estado'
import { AbastractRepositorioEstados } from '../../../AbastractRepositorioEstados'

class BuscarPeloNomeMongo extends AbastractRepositorioEstados implements IRepositorioEstados<Estado[] | undefined> {
  public queryObj: { nome: string }

  constructor (nome: string) {
    super()

    this.queryObj = { nome }
  }

  async execute (): Promise<Estado[] | undefined> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      const cursor = clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .collection(this.SCHEMA_NAME)
        .find({ nome: this.queryObj.nome })

      const data = await cursor.toArray()

      const estados = data.map(data => {
        return new Estado(data.nome, data.regiao)
      })

      return estados
    } finally {
      await clienteMongo.close()
    }
  }
}

export { BuscarPeloNomeMongo }
