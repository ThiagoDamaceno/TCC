import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'
import { ObterDados } from '../../../dadosParaTestes/ObterDados'
import { InserirVariosMunicipiosPostgres } from '../../../repositorios/postgres/implementacoes/municipios/InserirVariosMunicipiosPostgres'
import { AlterarMunicipiosPeloNomePostgres } from '../../../repositorios/postgres/implementacoes/municipios/AlterarMunicipiosPeloNomePostgres'

class TesteAlterarMunicipiosPeloNomePostgres extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const municipios = ObterDados.obterMunicipios()
    await (new InserirVariosMunicipiosPostgres(municipios)).execute()

    const alterarMunicipiosPeloNome = new AlterarMunicipiosPeloNomePostgres('Maringá', 'Maringa')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await alterarMunicipiosPeloNome.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteAlterarMunicipiosPeloNomePostgres }
