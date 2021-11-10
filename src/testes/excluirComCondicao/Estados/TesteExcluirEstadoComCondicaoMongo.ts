import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'
import { ExcluirEstadoPeloNomeMongo } from '../../../repositorios/mongo/implementacoes/estados/ExcluirEstadoPeloNomeMongo'

class TesteExcluirEstadoComCondicaoMongo extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const excluirEstadoPeloNome = new ExcluirEstadoPeloNomeMongo('Alagoas')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await excluirEstadoPeloNome.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteExcluirEstadoComCondicaoMongo }
