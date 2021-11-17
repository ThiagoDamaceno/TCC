import { AbstractModel } from './AbstractModel'

class Municipio extends AbstractModel {
  public constructor (
    public nome: string,
    public codigoUf: number,
    id?: string
  ) {
    super(id)
  }
}

export { Municipio }
