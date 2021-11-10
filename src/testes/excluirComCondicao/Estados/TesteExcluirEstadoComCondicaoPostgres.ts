import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'
import { ExcluirEstadoPeloNomePostgres } from '../../../repositorios/postgres/implementacoes/ExcluirEstadoPeloNomePostgres'

class TesteExcluirEstadoComCondicaoPostgres extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const excluirEstadoPeloNome = new ExcluirEstadoPeloNomePostgres('Alagoas')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await excluirEstadoPeloNome.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteExcluirEstadoComCondicaoPostgres }
