class Resultado {
  public resultados: {
    numeroDeRepeticoesDoTeste: number,
    tipoDoTeste: string,
    resultados: {
      sgbd: string,
      resultadosEmMilissegundos: number[],
      media: number
    }[]
  }

  // eslint-disable-next-line no-useless-constructor
  constructor (tipoDoTeste: string, resultados: {
    sgbd: string,
    resultadosEmMilissegundos: number[]
  }[]) {
    const resultadosRetorno = resultados.map(resultado => {
      let somaMilissegundos = 0
      resultado.resultadosEmMilissegundos.forEach(milissegundo => {
        somaMilissegundos += milissegundo
      })
      const media = somaMilissegundos / resultado.resultadosEmMilissegundos.length
      return {
        sgbd: resultado.sgbd,
        resultadosEmMilissegundos: resultado.resultadosEmMilissegundos,
        media
      }
    })
    this.resultados = {
      numeroDeRepeticoesDoTeste: resultados[0].resultadosEmMilissegundos.length,
      tipoDoTeste,
      resultados: resultadosRetorno
    }
  }
}

export { Resultado }
