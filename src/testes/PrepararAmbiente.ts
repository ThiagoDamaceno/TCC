import { CriarEstados } from '../repositorios/postgres/tabelas/CriarEstados'
import { InserirVariosEstadosMongo } from '../repositorios/mongo/implementacoes/estados/InserirVariosEstadosMongo'
import { ObterDados } from '../dadosParaTestes/ObterDados'
import { InserirVariosEstadosPostgres } from '../repositorios/postgres/implementacoes/estados/InserirVariosEstadosPostgres'
import { InserirVariosMunicipiosMongo } from '../repositorios/mongo/implementacoes/municipios/InserirVariosMunicipiosMongo'
import { InserirVariosMunicipiosPostgres } from '../repositorios/postgres/implementacoes/municipios/InserirVariosMunicipiosPostgres'
import { TruncateEstadosMongo } from '../repositorios/mongo/implementacoes/estados/TruncateEstadosMongo'
import { TruncateEstadosPostgres } from '../repositorios/postgres/implementacoes/estados/TruncateEstadosPostgres'
import { TruncateMunicipiosMongo } from '../repositorios/mongo/implementacoes/municipios/TruncateMunicipiosMongo'
import { TruncateMunicipiosPostgres } from '../repositorios/postgres/implementacoes/municipios/TruncateMunicipiosPostgres'
import { CriarMunicipios } from '../repositorios/postgres/tabelas/CriarMunicipios'

class PrepararAmbiente {
  public static async criarEsquemasSeNaoExistirem () {
    await (new CriarEstados()).createIfNotExists()
    await (new CriarMunicipios()).createIfNotExists()
  }

  public static async inserirTodosEstados () {
    const estados = ObterDados.obterEstados()
    await ((new InserirVariosEstadosMongo(estados)).execute())
    await ((new InserirVariosEstadosPostgres(estados)).execute())
  }

  public static async inserirTodosMunicipios () {
    const municipios = ObterDados.obterMunicipios()
    await ((new InserirVariosMunicipiosMongo(municipios)).execute())
    await ((new InserirVariosMunicipiosPostgres(municipios)).execute())
  }

  public static async inserirTodosOsDados () {
    await PrepararAmbiente.inserirTodosEstados()
    await PrepararAmbiente.inserirTodosMunicipios()
  }

  public static async truncateEstados () {
    await (new TruncateEstadosMongo()).execute()
    await (new TruncateEstadosPostgres()).execute()
  }

  public static async truncateMunicipios () {
    await (new TruncateMunicipiosMongo()).execute()
    await (new TruncateMunicipiosPostgres()).execute()
  }

  public static async truncateTodosOsDados () {
    await PrepararAmbiente.truncateMunicipios()
    await PrepararAmbiente.truncateEstados()
  }
}

export { PrepararAmbiente }
