import { ObterDados } from '../../../dadosParaTestes/ObterDados'
import { BuscarEstadoPeloNomeDoMunicipioMongo } from '../../../repositorios/mongo/implementacoes/estados/BuscarEstadoPeloNomeDoMunicipioMongo'
import { InserirVariosEstadosMongo } from '../../../repositorios/mongo/implementacoes/estados/InserirVariosEstadosMongo'
import { InserirVariosMunicipiosMongo } from '../../../repositorios/mongo/implementacoes/municipios/InserirVariosMunicipiosMongo'
import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'

class TesteBuscarComRelacionamentosMongo extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const estados = ObterDados.obterEstados()
    await (new InserirVariosEstadosMongo(estados)).execute()

    const municipios = ObterDados.obterMunicipios()
    await (new InserirVariosMunicipiosMongo(municipios)).execute()

    const findEstadoByName = new BuscarEstadoPeloNomeDoMunicipioMongo('Maringá')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await findEstadoByName.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteBuscarComRelacionamentosMongo }
