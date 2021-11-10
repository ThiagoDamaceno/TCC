import { Estado } from '../modelos/Estado'
import * as estadosFromJson from './estados.json'

function getEstadosInArray (multiplicador = 1): Estado[] {
  const estados: Estado[] = []

  for (let i = 0; i < multiplicador; i++) {
    estadosFromJson.forEach(
      estado => estados.push(new Estado(estado.nome, estado.regiao))
    )
  }

  return estados
}

export { getEstadosInArray }
