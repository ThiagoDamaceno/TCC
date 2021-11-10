import { BuscarEstadoPeloNomePostgres } from '../../repositorios/postgres/implementacoes/estados/BuscarEstadoPeloNomePostgres'
import { AbstractTeste } from '../AbstractTeste'
import { ITeste } from '../ITeste'

class TestBuscarEstadoPeloNomePostgres extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const findEstadoByName = new BuscarEstadoPeloNomePostgres('Paraná')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await findEstadoByName.execute()
    })

    return timeInMilliseconds
  }
}

export { TestBuscarEstadoPeloNomePostgres }
