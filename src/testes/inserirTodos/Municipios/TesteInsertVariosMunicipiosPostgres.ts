import { ITeste } from '../../ITeste'
import { AbstractTeste } from '../../AbstractTeste'
import { InserirVariosMunicipiosMongo } from '../../../repositorios/mongo/implementacoes/municipios/InserirVariosMunicipiosMongo'
import { ObterDados } from '../../../dadosParaTestes/ObterDados'

class TesteInsertVariosMunicipiosPostgres extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const municipios = ObterDados.obterMunicipios()
    const insertMunicipios = new InserirVariosMunicipiosMongo(municipios)

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await insertMunicipios.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteInsertVariosMunicipiosPostgres }
