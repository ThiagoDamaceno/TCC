import { ITeste } from '../../ITeste'
import { AbstractTeste } from '../../AbstractTeste'
import { BuscarTodosEstadosPostgres } from '../../../repositorios/postgres/implementacoes/BuscarTodosEstadosPostgres'

class TestBuscarTodosEstadosPostgres extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const findAllEstados = new BuscarTodosEstadosPostgres()

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await findAllEstados.execute()
    })

    return timeInMilliseconds
  }
}

export { TestBuscarTodosEstadosPostgres }
