import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'
import { ObterDados } from '../../../dadosParaTestes/ObterDados'
import { InserirVariosMunicipiosMongo } from '../../../repositorios/mongo/implementacoes/municipios/InserirVariosMunicipiosMongo'
import { AlterarMunicipiosPeloNomeMongo } from '../../../repositorios/mongo/implementacoes/municipios/AlterarMunicipiosPeloNomeMongo'

class TesteAlterarMunicipiosPeloNomeMongo extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const municipios = ObterDados.obterMunicipios()
    await (new InserirVariosMunicipiosMongo(municipios)).execute()

    const alterarMunicipiosPeloNome = new AlterarMunicipiosPeloNomeMongo('Maringá', 'Maringa')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await alterarMunicipiosPeloNome.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteAlterarMunicipiosPeloNomeMongo }
