import { IRepositorio } from '../../../IRepositorio'
import { ClientePostgres } from '../../ClientePostgres'
import { AbastractRepositorioMunicipios } from '../../../AbastractRepositorioMunicipios'
import { Municipio } from '../../../../modelos/Municipio'

class InserirVariosMunicipiosPostgres extends AbastractRepositorioMunicipios implements IRepositorio<void> {
  public queryObj: { insertQuery: string, values: string[] }

  constructor (municipios: Municipio[]) {
    super()

    let valuesInsert = ''
    municipios.forEach((_municipio, i) => {
      let string = `(
        $${(i * 6) + 1}, 
        $${(i * 6) + 2}, 
        $${(i * 6) + 3},
        $${(i * 6) + 4}, 
        $${(i * 6) + 5}, 
        $${(i * 6) + 6}
      )`

      if (i !== municipios.length - 1) { string += ', ' }

      valuesInsert += string
    })

    const insertQuery = `
        INSERT INTO ${this.SCHEMA_NAME} (id, codigoIbge, nome, latitude, longitude, codigoUf, ddd) values ${valuesInsert}
      `

    const values: string[] = []
    municipios.forEach(municipio => {
      values.push(municipio.id!)
      values.push(municipio.codigoIbge.toString())
      values.push(municipio.nome)
      values.push(municipio.latitude.toString())
      values.push(municipio.longitude.toString())
      values.push(municipio.codigoUf.toString())
      values.push(municipio.ddd.toString())
    })

    this.queryObj = { insertQuery, values }
  }

  async execute (): Promise<void> {
    const client = (new ClientePostgres()).client
    client.connect()
    try {
      await client.query(this.queryObj.insertQuery, this.queryObj.values)
    } catch (error) {
      console.error(error)
    } finally {
      await client.end()
    }
  }
}

export { InserirVariosMunicipiosPostgres }
