import { getEstadosInArray } from '../../../dadosParaTestes/getEstadosInArray'
import { InserirVariosEstadosMongo } from '../../../repositorios/mongo/implementacoes/InserirVariosEstadosMongo'
import { ITeste } from '../../ITeste'
import { AbstractTeste } from '../../AbstractTeste'

class TestInsertAllEstadosMongo extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const estados = getEstadosInArray()
    const insertEstados = new InserirVariosEstadosMongo(estados)

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await insertEstados.execute()
    })

    return timeInMilliseconds
  }
}

export { TestInsertAllEstadosMongo }
