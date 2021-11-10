class Municipio {
  public pagamentosBolsaFamilha: any[] = []
  public constructor (
    public codigoIbge: string, public nome: string, public latitude:string, public longitude: string, public capital: number, pagamentosBolsaFamilha: any[]
  ) {
    this.setPagamentosBolsaFamilha(pagamentosBolsaFamilha)
  }

  public adicionarPagamentosBolsaFamilha (pagamentosBolsaFamilha: any[]): void {
    this.setPagamentosBolsaFamilha(pagamentosBolsaFamilha)
  }

  private setPagamentosBolsaFamilha (pagamentosBolsaFamilha: any[]) {
    pagamentosBolsaFamilha.forEach(pagamentoBolsaFamilha => {
      this.pagamentosBolsaFamilha.push(pagamentoBolsaFamilha)
    })
  }
}

export { Municipio }
