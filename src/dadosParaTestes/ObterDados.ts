import { Estado } from '../modelos/Estado'
import { Municipio } from '../modelos/Municipio'
import * as estadosFromJson from './estados.json'
import * as municipiosFromJson from './municipios.json'

class ObterDados {
  public static obterMunicipios (): Municipio[] {
    const municipios: Municipio[] = []

    municipiosFromJson.forEach(
      municipio => municipios.push(new Municipio(
        municipio.nome,
        municipio.codigo_uf
      ))
    )

    return municipios
  }

  public static obterEstados (): Estado[] {
    const estados: Estado[] = []

    estadosFromJson.forEach(
      estado => estados.push(new Estado(estado.nome, estado.codigo_uf))
    )

    return estados
  }
}

export { ObterDados }
