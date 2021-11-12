import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'
import { ExcluirMunicipiosPeloNomeMongo } from '../../../repositorios/mongo/implementacoes/municipios/ExcluirMunicipiosPeloNomeMongo'
import { ObterDados } from '../../../dadosParaTestes/ObterDados'
import { InserirVariosMunicipiosMongo } from '../../../repositorios/mongo/implementacoes/municipios/InserirVariosMunicipiosMongo'

class TesteExcluirMunicipioComCondicaoMongo extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const municipios = ObterDados.obterMunicipios()
    await (new InserirVariosMunicipiosMongo(municipios)).execute()

    const excluirMunicipioPeloNome = new ExcluirMunicipiosPeloNomeMongo('Maringá')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await excluirMunicipioPeloNome.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteExcluirMunicipioComCondicaoMongo }
