import { ObterDados } from '../../../dadosParaTestes/ObterDados'
import { BuscarEstadoPeloNomeDoMunicipioPostgres } from '../../../repositorios/postgres/implementacoes/estados/BuscarEstadoPeloNomeDoMunicipioPostgres'
import { InserirVariosEstadosPostgres } from '../../../repositorios/postgres/implementacoes/estados/InserirVariosEstadosPostgres'
import { InserirVariosMunicipiosPostgres } from '../../../repositorios/postgres/implementacoes/municipios/InserirVariosMunicipiosPostgres'
import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'

class TesteBuscarComRelacionamentosPostgres extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const estados = ObterDados.obterEstados()
    await (new InserirVariosEstadosPostgres(estados)).execute()

    const municipios = ObterDados.obterMunicipios()
    await (new InserirVariosMunicipiosPostgres(municipios)).execute()

    const findEstadoByName = new BuscarEstadoPeloNomeDoMunicipioPostgres('Maringá')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await findEstadoByName.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteBuscarComRelacionamentosPostgres }
