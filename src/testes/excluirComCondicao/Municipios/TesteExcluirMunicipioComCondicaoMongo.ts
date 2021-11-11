import { AbstractTeste } from '../../AbstractTeste'
import { ITeste } from '../../ITeste'
import { ExcluirMunicipioPeloNomeMongo } from '../../../repositorios/mongo/implementacoes/municipios/ExcluirMunicipioPeloNomeMongo'

class TesteExcluirMunicipioComCondicaoMongo extends AbstractTeste implements ITeste {
  // eslint-disable-next-line no-useless-constructor
  public constructor () {
    super()
  }

  async getInMilliseconds (): Promise<number> {
    const excluirMunicipioPeloNome = new ExcluirMunicipioPeloNomeMongo('Maringá')

    const timeInMilliseconds = await this.getFunctionPerformanceInMilliseconds(async () => {
      await excluirMunicipioPeloNome.execute()
    })

    return timeInMilliseconds
  }
}

export { TesteExcluirMunicipioComCondicaoMongo }
