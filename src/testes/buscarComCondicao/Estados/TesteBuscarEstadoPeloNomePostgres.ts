import { ObterDados } from '../../../dadosParaTestes/ObterDados'
import { BuscarEstadoPeloNomePostgres } from '../../../repositorios/postgres/implementacoes/estados/BuscarEstadoPeloNomePostgres'
import { InserirVariosEstadosPostgres } from '../../../repositorios/postgres/implementacoes/estados/InserirVariosEstadosPostgres'
import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'

class TesteBuscarEstadoPeloNomePostgres extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const estados = ObterDados.obterEstados()
    await (new InserirVariosEstadosPostgres(estados)).execute()

    const findEstadoByName = new BuscarEstadoPeloNomePostgres('Paraná')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await findEstadoByName.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteBuscarEstadoPeloNomePostgres }
