import { IGerarResultados } from './IGerarResultados'
import { obterStringComHoraAtual } from '../obterStringComHoraAtual'
import fs = require('fs')
import { GerarResultados } from './AbastractGerarResultados'
import { TesteBuscarMunicipiosPeloNomeMongo } from '../buscarComCondicao/Municipios/TesteBuscarMunicipiosPeloNomeMongo'
import { TesteBuscarMunicipiosPeloNomePostgres } from '../buscarComCondicao/Municipios/TesteBuscarMunicipiosPeloNomePostgres'

class GerarResultadosBuscarMunicipiosComCondicao extends GerarResultados implements IGerarResultados {
  public async gerarResultados (): Promise<void> {
    const resultados = await this.calcular(
      'Buscar Municipios com condicao',
      async () => await (new TesteBuscarMunicipiosPeloNomeMongo()).getInMilliseconds(),
      async () => await (new TesteBuscarMunicipiosPeloNomePostgres()).getInMilliseconds()
    )

    fs.writeFile(`src/resultados/${obterStringComHoraAtual()}_Resultados-Buscar-Com-Condicao.json`, JSON.stringify(resultados.resultados), function (err: any) {
      if (err) {
        console.log(err)
      }
    })
  }
}

export { GerarResultadosBuscarMunicipiosComCondicao }
