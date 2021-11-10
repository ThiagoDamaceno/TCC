import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'
import { AlterarEstadoPeloNomeMongo } from '../../../repositorios/mongo/implementacoes/estados/AlterarEstadoPeloNomeMongo'

class TestAlterarEstadoPeloNomeMongo extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const updateEstadoByNamo = new AlterarEstadoPeloNomeMongo('Distrito Federal', 'Brasília')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await updateEstadoByNamo.execute()
    })

    return timeInMilliseconds
  }
}

export { TestAlterarEstadoPeloNomeMongo }
