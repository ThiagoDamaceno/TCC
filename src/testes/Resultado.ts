class Resultado {
  public resultados: {
    numeroDeRepeticoesDoTeste: number,
    tipoDoTeste: string,
    resultados: {
      sgbd: string,
      resultadosEmMilisegundos: number[],
      media: number
    }[]
  }

  // eslint-disable-next-line no-useless-constructor
  constructor (tipoDoTeste: string, resultados: {
    sgbd: string,
    resultadosEmMilisegundos: number[]
  }[]) {
    const resultadosRetorno = resultados.map(resultado => {
      let somaMilisegundos = 0
      resultado.resultadosEmMilisegundos.forEach(milisegundo => {
        somaMilisegundos += milisegundo
      })
      const media = somaMilisegundos / resultado.resultadosEmMilisegundos.length
      return {
        sgbd: resultado.sgbd,
        resultadosEmMilisegundos: resultado.resultadosEmMilisegundos,
        media
      }
    })
    this.resultados = {
      numeroDeRepeticoesDoTeste: resultados[0].resultadosEmMilisegundos.length,
      tipoDoTeste,
      resultados: resultadosRetorno
    }
  }
}

export { Resultado }
