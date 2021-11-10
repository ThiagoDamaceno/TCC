import { AbstractModel } from './AbstractModel'

class Municipio extends AbstractModel {
  public constructor (
    public codigoIbge: number,
    public nome: string,
    public latitude: number,
    public longitude: number,
    public codigoUf: number,
    public ddd: number,
    id?: string
  ) {
    super(id)
  }
}

export { Municipio }
