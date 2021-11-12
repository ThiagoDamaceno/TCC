import { ObterDados } from '../../../dadosParaTestes/ObterDados'
import { BuscarMunicipiosPeloNomePostgres } from '../../../repositorios/postgres/implementacoes/municipios/BuscarMunicipiosPeloNomePostgres'
import { InserirVariosMunicipiosPostgres } from '../../../repositorios/postgres/implementacoes/municipios/InserirVariosMunicipiosPostgres'
import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'

class TesteBuscarMunicipiosPeloNomePostgres extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const municipios = ObterDados.obterMunicipios()
    await (new InserirVariosMunicipiosPostgres(municipios)).execute()

    const findEstadoByName = new BuscarMunicipiosPeloNomePostgres('Maringá')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await findEstadoByName.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteBuscarMunicipiosPeloNomePostgres }
