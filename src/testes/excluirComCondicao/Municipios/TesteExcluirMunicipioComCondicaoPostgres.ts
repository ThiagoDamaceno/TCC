import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'
import { ExcluirMunicipioPeloNomePostgres } from '../../../repositorios/postgres/implementacoes/municipios/ExcluirMunicipioPeloNomePostgres'

class TesteExcluirMunicipioComCondicaoPostgres extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const excluirMunicipioPeloNome = new ExcluirMunicipioPeloNomePostgres('Maringá')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await excluirMunicipioPeloNome.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteExcluirMunicipioComCondicaoPostgres }
