import { getEstadosInArray } from '../../../dadosParaTestes/getEstadosInArray'
import { ITeste } from '../../ITeste'
import { AbstractTeste } from '../../AbstractTeste'
import { InserirVariosEstadosPostgres } from '../../../repositorios/postgres/implementacoes/estados/InserirVariosEstadosPostgres'

class TestInserirVariosEstadosPostgres extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const estados = getEstadosInArray()
    const insertEstados = new InserirVariosEstadosPostgres(estados)

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await insertEstados.execute()
    })

    return timeInMilliseconds
  }
}

export { TestInserirVariosEstadosPostgres }
