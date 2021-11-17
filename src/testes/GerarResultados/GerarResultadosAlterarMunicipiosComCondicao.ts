import { IGerarResultados } from './IGerarResultados'
import { obterStringComHoraAtual } from '../obterStringComHoraAtual'
import fs = require('fs')
import { GerarResultados } from './AbastractGerarResultados'
import { TesteAlterarMunicipiosPeloNomeMongo } from '../alterarComCondicao/Municipios/TesteAlterarMunicipiosPeloNomeMongo'
import { TesteAlterarMunicipiosPeloNomePostgres } from '../alterarComCondicao/Municipios/TesteAlterarMunicipiosPeloNomePostgres'

class GerarResultadosAlterarMunicipiosComCondicao extends GerarResultados implements IGerarResultados {
  public async gerarResultados (): Promise<void> {
    const resultados = await this.calcular(
      'Alterar Municipios com Condicao',
      async () => await (new TesteAlterarMunicipiosPeloNomeMongo()).getInMilliseconds(),
      async () => await (new TesteAlterarMunicipiosPeloNomePostgres()).getInMilliseconds()
    )

    fs.writeFile(`resultados/${obterStringComHoraAtual()}_Resultados-Alterar-Com-Condicao.json`, JSON.stringify(resultados.resultados), function (err: any) {
      if (err) {
        console.log(err)
      }
    })
  }
}

export { GerarResultadosAlterarMunicipiosComCondicao }
