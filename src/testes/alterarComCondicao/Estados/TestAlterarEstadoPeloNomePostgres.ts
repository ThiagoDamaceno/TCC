import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'
import { AlterarEstadoPeloNomePostgres } from '../../../repositorios/postgres/implementacoes/estados/AlterarEstadoPeloNomePostgres'

class TestAlterarEstadoPeloNomePostgres extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const updateEstadoByNamo = new AlterarEstadoPeloNomePostgres('Distrito Federal', 'Brasília')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await updateEstadoByNamo.execute()
    })

    return timeInMilliseconds
  }
}

export { TestAlterarEstadoPeloNomePostgres }
