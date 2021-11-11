import { ITeste } from '../../ITeste'
import { AbstractTeste } from '../../AbstractTeste'
import { BuscarTodosMunicipiosMongo } from '../../../repositorios/mongo/implementacoes/municipios/BuscarTodosMunicipiosMongo'

class TesteBuscarTodosMunicipiosMongo extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const findAllEstados = new BuscarTodosMunicipiosMongo()

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await findAllEstados.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteBuscarTodosMunicipiosMongo }
