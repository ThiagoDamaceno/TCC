import { ITeste } from '../../ITeste'
import { AbstractTeste } from '../../AbstractTeste'
import { BuscarTodosEstadosMongo } from '../../../repositorios/mongo/implementacoes/estados/BuscarTodosEstadosMongo'
import { ObterDados } from '../../../dadosParaTestes/ObterDados'
import { InserirVariosEstadosMongo } from '../../../repositorios/mongo/implementacoes/estados/InserirVariosEstadosMongo'

class TesteBuscarTodosEstadosMongo extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const estados = ObterDados.obterEstados()
    await (new InserirVariosEstadosMongo(estados)).execute()

    const findAllEstados = new BuscarTodosEstadosMongo()

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await findAllEstados.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteBuscarTodosEstadosMongo }
