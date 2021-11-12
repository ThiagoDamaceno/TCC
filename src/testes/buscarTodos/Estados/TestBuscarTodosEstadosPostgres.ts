import { ITeste } from '../../ITeste'
import { AbstractTeste } from '../../AbstractTeste'
import { BuscarTodosEstadosPostgres } from '../../../repositorios/postgres/implementacoes/estados/BuscarTodosEstadosPostgres'
import { ObterDados } from '../../../dadosParaTestes/ObterDados'
import { InserirVariosEstadosPostgres } from '../../../repositorios/postgres/implementacoes/estados/InserirVariosEstadosPostgres'

class TestBuscarTodosEstadosPostgres extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const estados = ObterDados.obterEstados()
    await (new InserirVariosEstadosPostgres(estados)).execute()

    const findAllEstados = new BuscarTodosEstadosPostgres()

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await findAllEstados.execute()
    })

    return timeInMilliseconds
  }
}

export { TestBuscarTodosEstadosPostgres }
