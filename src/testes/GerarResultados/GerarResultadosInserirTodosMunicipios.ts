import { IGerarResultados } from './IGerarResultados'
import { obterStringComHoraAtual } from '../obterStringComHoraAtual'
import fs = require('fs')
import { TesteInsertVariosMunicipiosMongo } from '../inserirTodos/Municipios/TesteInsertVariosMunicipiosMongo'
import { TesteInsertVariosMunicipiosPostgres } from '../inserirTodos/Municipios/TesteInsertVariosMunicipiosPostgres'
import { GerarResultados } from './AbastractGerarResultados'

class GerarResultadosInserirTodosMunicipios extends GerarResultados implements IGerarResultados {
  public async gerarResultados (): Promise<void> {
    const resultados = await this.calcular(
      'Inserir Todos os Municipios',
      async () => await (new TesteInsertVariosMunicipiosMongo()).getInMilliseconds(),
      async () => await (new TesteInsertVariosMunicipiosPostgres()).getInMilliseconds()
    )

    fs.writeFile(`resultados/${obterStringComHoraAtual()}_Resultados-Inserir-Todos.json`, JSON.stringify(resultados.resultados), function (err: any) {
      if (err) {
        console.log(err)
      }
    })
  }
}

export { GerarResultadosInserirTodosMunicipios }
