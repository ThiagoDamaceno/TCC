import { ITeste } from '../../ITeste'
import { AbstractTeste } from '../../AbstractTeste'
import { BuscarTodosMunicipiosPostgres } from '../../../repositorios/postgres/implementacoes/municipios/BuscarTodosMunicipiosPostgres'
import { ObterDados } from '../../../dadosParaTestes/ObterDados'
import { InserirVariosMunicipiosPostgres } from '../../../repositorios/postgres/implementacoes/municipios/InserirVariosMunicipiosPostgres'

class TesteBuscarTodosMunicipiosPostgres extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const municipios = ObterDados.obterMunicipios()
    await (new InserirVariosMunicipiosPostgres(municipios)).execute()

    const findAllEstados = new BuscarTodosMunicipiosPostgres()

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await findAllEstados.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteBuscarTodosMunicipiosPostgres }
