import { ITeste } from '../../ITeste'
import { AbstractTeste } from '../../AbstractTeste'
import { InserirVariosEstadosPostgres } from '../../../repositorios/postgres/implementacoes/estados/InserirVariosEstadosPostgres'
import { ObterDados } from '../../../dadosParaTestes/ObterDados'

class TesteInserirVariosEstadosPostgres extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const estados = ObterDados.obterEstados()
    const insertEstados = new InserirVariosEstadosPostgres(estados)

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await insertEstados.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteInserirVariosEstadosPostgres }
