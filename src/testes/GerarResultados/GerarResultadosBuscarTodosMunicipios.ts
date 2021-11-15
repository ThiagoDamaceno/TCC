import { IGerarResultados } from './IGerarResultados'
import { obterStringComHoraAtual } from '../obterStringComHoraAtual'
import fs = require('fs')
import { GerarResultados } from './AbastractGerarResultados'
import { TesteBuscarTodosMunicipiosMongo } from '../buscarTodos/Municipios/TesteBuscarTodosMunicipiosMongo'
import { TesteBuscarTodosMunicipiosPostgres } from '../buscarTodos/Municipios/TesteBuscarTodosMunicipiosPostgres'

class GerarResultadosBuscarTodosMunicipios extends GerarResultados implements IGerarResultados {
  public async gerarResultados (): Promise<void> {
    const resultados = await this.calcular(
      'Buscar Todos os Municipios',
      async () => await (new TesteBuscarTodosMunicipiosMongo()).getInMilliseconds(),
      async () => await (new TesteBuscarTodosMunicipiosPostgres()).getInMilliseconds()
    )

    fs.writeFile(`resultados/${obterStringComHoraAtual()}_Resultados-Buscar-Todos.json`, JSON.stringify(resultados.resultados), function (err: any) {
      if (err) {
        console.log(err)
      }
    })
  }
}

export { GerarResultadosBuscarTodosMunicipios }
