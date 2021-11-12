import { ObterDados } from '../../../dadosParaTestes/ObterDados'
import { BuscarMunicipiosPeloNomeMongo } from '../../../repositorios/mongo/implementacoes/municipios/BuscarMunicipioPeloNomeMongo'
import { InserirVariosMunicipiosMongo } from '../../../repositorios/mongo/implementacoes/municipios/InserirVariosMunicipiosMongo'
import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'

class TesteBuscarMunicipiosPeloNomeMongo extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const municipios = ObterDados.obterMunicipios()
    await (new InserirVariosMunicipiosMongo(municipios)).execute()

    const findEstadoByName = new BuscarMunicipiosPeloNomeMongo('Maringá')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await findEstadoByName.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteBuscarMunicipiosPeloNomeMongo }
