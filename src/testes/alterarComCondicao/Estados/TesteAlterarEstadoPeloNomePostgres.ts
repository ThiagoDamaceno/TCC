import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'
import { AlterarEstadoPeloNomePostgres } from '../../../repositorios/postgres/implementacoes/estados/AlterarEstadoPeloNomePostgres'
import { InserirVariosEstadosPostgres } from '../../../repositorios/postgres/implementacoes/estados/InserirVariosEstadosPostgres'
import { ObterDados } from '../../../dadosParaTestes/ObterDados'

class TesteAlterarEstadoPeloNomePostgres extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const estados = ObterDados.obterEstados()
    await (new InserirVariosEstadosPostgres(estados)).execute()
    const updateEstadoByNamo = new AlterarEstadoPeloNomePostgres('Distrito Federal', 'Brasília')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await updateEstadoByNamo.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteAlterarEstadoPeloNomePostgres }
