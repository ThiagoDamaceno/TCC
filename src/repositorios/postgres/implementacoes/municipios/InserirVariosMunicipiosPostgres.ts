import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { RepositorioMunicipios } from '../../../RepositorioMunicipios'
import { Municipio } from '../../../../modelos/Municipio'

class InserirVariosMunicipiosPostgres implements IRepositorio<void> {
  public queryObj: { insertQuery: string, values: string[] }

  constructor (municipios: Municipio[]) {
    let valuesInsert = ''
    municipios.forEach((_municipio, i) => {
      let string = `(
        $${(i * 3) + 1}, 
        $${(i * 3) + 2}, 
        $${(i * 3) + 3}
      )`

      if (i !== municipios.length - 1) { string += ', ' }

      valuesInsert += string
    })

    const insertQuery = `
        INSERT INTO ${RepositorioMunicipios.SCHEMA_NAME} (id, nome, codigoUf) values ${valuesInsert}
      `

    const values: string[] = []
    municipios.forEach(municipio => {
      values.push(municipio.id!)
      values.push(municipio.nome)
      values.push(municipio.codigoUf.toString())
    })

    this.queryObj = { insertQuery, values }
  }

  async execute (): Promise<void> {
    const client = (new ClientePostgres()).client
    client.connect()
    try {
      await client.query(this.queryObj.insertQuery, this.queryObj.values)
      await client.end()
    } catch (error) {
      console.error(error)
    }
  }
}

export { InserirVariosMunicipiosPostgres }
