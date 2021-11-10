import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'
import { AlterarPeloNomeMongo } from '../../../repositorios/mongo/implementacoes/AlterarPeloNomeMongo'

class TestAlterarPeloNomeMongo extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const updateEstadoByNamo = new AlterarPeloNomeMongo('Distrito Federal', 'Brasília')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await updateEstadoByNamo.execute()
    })

    return timeInMilliseconds
  }
}

export { TestAlterarPeloNomeMongo }
