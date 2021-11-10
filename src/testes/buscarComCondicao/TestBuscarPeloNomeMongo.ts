import { BuscarPeloNomeMongo } from '../../repositorios/mongo/implementacoes/BuscarPeloNomeMongo'
import { AbstractTeste } from '../AbstractTeste'
import { ITeste } from '../ITeste'

class TestBuscarPeloNomeMongo extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const findEstadoByName = new BuscarPeloNomeMongo('Paraná')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await findEstadoByName.execute()
    })

    return timeInMilliseconds
  }
}

export { TestBuscarPeloNomeMongo }
