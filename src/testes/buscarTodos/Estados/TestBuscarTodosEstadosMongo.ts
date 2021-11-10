import { ITeste } from '../../ITeste'
import { AbstractTeste } from '../../AbstractTeste'
import { BuscarTodosEstadosMongo } from '../../../repositorios/mongo/implementacoes/BuscarTodosEstadosMongo'

class TestBuscarTodosEstadosMongo extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const findAllEstados = new BuscarTodosEstadosMongo()

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await findAllEstados.execute()
    })

    return timeInMilliseconds
  }
}

export { TestBuscarTodosEstadosMongo }
