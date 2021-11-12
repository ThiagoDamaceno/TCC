import { IGerarResultados } from './IGerarResultados'
import { obterStringComHoraAtual } from '../obterStringComHoraAtual'
import fs = require('fs')
import { GerarResultados } from './AbastractGerarResultados'
import { TesteExcluirMunicipioComCondicaoMongo } from '../excluirComCondicao/Municipios/TesteExcluirMunicipioComCondicaoMongo'
import { TesteExcluirMunicipioComCondicaoPostgres } from '../excluirComCondicao/Municipios/TesteExcluirMunicipioComCondicaoPostgres'

class GerarResultadosExcluirMunicipiosComCondicao extends GerarResultados implements IGerarResultados {
  public async gerarResultados (): Promise<void> {
    const resultados = await this.calcular(
      'Excluir Municipios com Condicao',
      async () => await (new TesteExcluirMunicipioComCondicaoMongo()).getInMilliseconds(),
      async () => await (new TesteExcluirMunicipioComCondicaoPostgres()).getInMilliseconds()
    )

    fs.writeFile(`src/resultados/${obterStringComHoraAtual()}_Resultados-Excluir-Com-Condicao.json`, JSON.stringify(resultados.resultados), function (err: any) {
      if (err) {
        console.log(err)
      }
    })
  }
}

export { GerarResultadosExcluirMunicipiosComCondicao }
