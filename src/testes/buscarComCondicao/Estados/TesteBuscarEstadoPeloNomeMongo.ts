import { ObterDados } from '../../../dadosParaTestes/ObterDados'
import { BuscarPeloNomeMongo } from '../../../repositorios/mongo/implementacoes/estados/BuscarPeloNomeMongo'
import { InserirVariosEstadosMongo } from '../../../repositorios/mongo/implementacoes/estados/InserirVariosEstadosMongo'
import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'

class TesteBuscarEstadoPeloNomeMongo extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const estados = ObterDados.obterEstados()
    await (new InserirVariosEstadosMongo(estados)).execute()

    const findEstadoByName = new BuscarPeloNomeMongo('Paraná')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await findEstadoByName.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteBuscarEstadoPeloNomeMongo }
