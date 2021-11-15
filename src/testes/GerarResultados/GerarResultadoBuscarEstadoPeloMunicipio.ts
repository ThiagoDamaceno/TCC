import { IGerarResultados } from './IGerarResultados'
import { obterStringComHoraAtual } from '../obterStringComHoraAtual'
import fs = require('fs')
import { GerarResultados } from './AbastractGerarResultados'
import { TesteBuscarComRelacionamentosMongo } from '../buscarComRelacionamentos/Estados/TesteBuscarComRelacionamentosMongo'
import { TesteBuscarComRelacionamentosPostgres } from '../buscarComRelacionamentos/Estados/TesteBuscarComRelacionamentosPostgres'

class GerarResultadoBuscarEstadoPeloMunicipio extends GerarResultados implements IGerarResultados {
  public async gerarResultados (): Promise<void> {
    const resultados = await this.calcular(
      'Buscar Estado pelo municipio',
      async () => await new TesteBuscarComRelacionamentosMongo().getInMilliseconds(),
      async () => await new TesteBuscarComRelacionamentosPostgres().getInMilliseconds()
    )

    fs.writeFile(`resultados/${obterStringComHoraAtual()}_Resultados-Buscar-Estado-Pelo-Municipio.json`, JSON.stringify(resultados.resultados), function (err: any) {
      if (err) {
        console.log(err)
      }
    })
  }
}

export { GerarResultadoBuscarEstadoPeloMunicipio }
