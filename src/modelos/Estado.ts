import { AbstractModel } from './AbstractModel'
import { Municipio } from './Municipio'
class Estado extends AbstractModel {
  public municipios: any[] = []
  // eslint-disable-next-line no-useless-constructor
  public constructor (
    public nome: string, public regiao: string
  ) {
    super()
  }

  public adicionarMunicipio (municipios: Municipio[]): void {
    this.setMunicipios(municipios)
  }

  private setMunicipios (municipios: Municipio[]) {
    municipios.forEach(municipio => {
      this.municipios.push(municipio)
    })
  }
}

export { Estado }
