import { PrepararAmbiente } from '../PrepararAmbiente'
import { Resultado } from '../Resultado'

abstract class GerarResultados {
  private static NUMERO_DE_REPETICOES_DOS_TESTES = 10
  protected async calcular (tipoDoTeste: string, funcaoTesteMongo: Function, funcaoTestePostgres: Function): Promise<Resultado> {
    const resultadosTestes = [
      {
        sgbd: 'mongo',
        // eslint-disable-next-line no-array-constructor
        resultadosEmMilissegundos: Array()
      },
      {
        sgbd: 'postgres',
        // eslint-disable-next-line no-array-constructor
        resultadosEmMilissegundos: Array()
      }
    ]
    console.log()
    // Testes
    for (let i = 0; i < GerarResultados.NUMERO_DE_REPETICOES_DOS_TESTES; i++) {
      console.log(((i / GerarResultados.NUMERO_DE_REPETICOES_DOS_TESTES) * 100).toFixed(0) + '%')
      await PrepararAmbiente.truncateTodosOsDados()

      const resultadoMongo = await funcaoTesteMongo()
      const resuldadoPostgres = await funcaoTestePostgres()
      resultadosTestes[0].resultadosEmMilissegundos.push(resultadoMongo)
      resultadosTestes[1].resultadosEmMilissegundos.push(resuldadoPostgres)
    }
    console.log('100%')
    return new Resultado(tipoDoTeste, resultadosTestes)
  }
}

export { GerarResultados }
