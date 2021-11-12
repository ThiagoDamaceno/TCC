import { ClienteMongo } from '../../ClienteMongo'
import { IRepositorio } from '../../../IRepositorio'
import { Estado } from '../../../../modelos/Estado'
import { RepositorioEstados } from '../../../RepositorioEstados'
import { RepositorioMunicipios } from '../../../RepositorioMunicipios'

class BuscarEstadoPeloNomeDoMunicipioMongo implements IRepositorio<Estado | undefined> {
  public queryObj: { nome: string }

  constructor (nome: string) {
    this.queryObj = { nome }
  }

  async execute (): Promise<Estado | undefined> {
    const clienteMongo = (new ClienteMongo()).client
    try {
      await clienteMongo.connect()

      const cursor = clienteMongo
        .db(process.env.MONGO_INIT_DB)
        .collection(RepositorioEstados.SCHEMA_NAME)
        .aggregate([
          {
            $lookup: {
              from: RepositorioMunicipios.SCHEMA_NAME,
              localField: 'codigoUf',
              foreignField: 'codigoUf',

              as: RepositorioMunicipios.SCHEMA_NAME
            }
          },
          {
            $unwind: `$${RepositorioMunicipios.SCHEMA_NAME}`
          },
          {
            $match: {
              'municipios.nome': 'Maringá'
            }
          }
        ])

      const data = await cursor.toArray()
      clienteMongo.close()
      if (data.length > 0) {
        return new Estado(data[0].nome, data[0].codigoUf, data[0].id)
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export { BuscarEstadoPeloNomeDoMunicipioMongo }
