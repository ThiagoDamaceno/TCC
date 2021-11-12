import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'
import { ExcluirEstadoPeloNomePostgres } from '../../../repositorios/postgres/implementacoes/estados/ExcluirEstadoPeloNomePostgres'
import { ObterDados } from '../../../dadosParaTestes/ObterDados'
import { InserirVariosEstadosPostgres } from '../../../repositorios/postgres/implementacoes/estados/InserirVariosEstadosPostgres'

class TesteExcluirEstadoComCondicaoPostgres extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const estados = ObterDados.obterEstados()
    await (new InserirVariosEstadosPostgres(estados)).execute()

    const excluirEstadoPeloNome = new ExcluirEstadoPeloNomePostgres('Alagoas')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await excluirEstadoPeloNome.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteExcluirEstadoComCondicaoPostgres }
