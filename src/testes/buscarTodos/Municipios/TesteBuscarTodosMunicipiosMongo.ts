import { ITeste } from '../../ITeste'
import { AbstractTeste } from '../../AbstractTeste'
import { BuscarTodosMunicipiosMongo } from '../../../repositorios/mongo/implementacoes/municipios/BuscarTodosMunicipiosMongo'
import { ObterDados } from '../../../dadosParaTestes/ObterDados'
import { InserirVariosMunicipiosMongo } from '../../../repositorios/mongo/implementacoes/municipios/InserirVariosMunicipiosMongo'

class TesteBuscarTodosMunicipiosMongo extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const municipios = ObterDados.obterMunicipios()
    await (new InserirVariosMunicipiosMongo(municipios)).execute()

    const findAllEstados = new BuscarTodosMunicipiosMongo()

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await findAllEstados.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteBuscarTodosMunicipiosMongo }
