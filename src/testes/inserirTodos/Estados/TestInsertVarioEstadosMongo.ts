import { InserirVariosEstadosMongo } from '../../../repositorios/mongo/implementacoes/estados/InserirVariosEstadosMongo'
import { ITeste } from '../../ITeste'
import { AbstractTeste } from '../../AbstractTeste'
import { ObterDados } from '../../../dadosParaTestes/ObterDados'

class TestInsertVarioEstadosMongo extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const estados = ObterDados.obterEstados()
    const insertEstados = new InserirVariosEstadosMongo(estados)

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await insertEstados.execute()
    })

    return timeInMilliseconds
  }
}

export { TestInsertVarioEstadosMongo }
