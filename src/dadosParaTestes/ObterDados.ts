import { Estado } from '../modelos/Estado'
import { Municipio } from '../modelos/Municipio'
import * as estadosFromJson from './estados.json'
import * as municipiosFromJson from './municipios.json'

class ObterDados {
  public static obterMunicipios (): Municipio[] {
    const municipios: Municipio[] = []

    municipiosFromJson.forEach(
      municipio => municipios.push(new Municipio(
        municipio.codigo_ibge,
        municipio.nome,
        municipio.latitude,
        municipio.longitude,
        municipio.codigo_uf,
        municipio.ddd
      ))
    )

    return municipios
  }

  public static obterEstados (): Estado[] {
    const estados: Estado[] = []

    estadosFromJson.forEach(
      estado => estados.push(new Estado(estado.nome, estado.regiao))
    )

    return estados
  }
}

export { ObterDados }
