import { GerarResultadosExcluirMunicipiosComCondicao } from './testes/GerarResultados/GerarResultadosExcluirMunicipiosComCondicao'
import { GerarResultadosBuscarTodosMunicipios } from './testes/GerarResultados/GerarResultadosBuscarTodosMunicipios'
import { GerarResultadosInserirTodosMunicipios } from './testes/GerarResultados/GerarResultadosInserirTodosMunicipios'
import { PrepararAmbiente } from './testes/PrepararAmbiente'
import { GerarResultadosBuscarMunicipiosComCondicao } from './testes/GerarResultados/GerarResultadosBuscarMunicipiosComCondicao'
import { GerarResultadosAlterarMunicipiosComCondicao } from './testes/GerarResultados/GerarResultadosAlterarMunicipiosComCondicao'
import { GerarResultadoBuscarEstadoPeloMunicipio } from './testes/GerarResultados/GerarResultadoBuscarEstadoPeloMunicipio'
import { BuscarEstadoPeloNomeDoMunicipioMongo } from './repositorios/mongo/implementacoes/estados/BuscarEstadoPeloNomeDoMunicipioMongo'
import { BuscarEstadoPeloNomeDoMunicipioPostgres } from './repositorios/postgres/implementacoes/estados/BuscarEstadoPeloNomeDoMunicipioPostgres'
import { TesteBuscarComRelacionamentosMongo } from './testes/buscarComRelacionamentos/Estados/TesteBuscarComRelacionamentosMongo'
import { TesteBuscarComRelacionamentosPostgres } from './testes/buscarComRelacionamentos/Estados/TesteBuscarComRelacionamentosPostgres'

async function init () {
  console.clear()

  console.log('Iniciando testes: ')
  console.log()

  console.log('Criando estruturas...')

  await PrepararAmbiente.criarEsquemasSeNaoExistirem()
  await PrepararAmbiente.truncateTodosOsDados()
  await PrepararAmbiente.inserirTodosOsDados()

  console.log('Estruturas criadas')
  console.log('')

  console.log('Gerando resultados (Inserir todos os municipios)...')
  await (new GerarResultadosInserirTodosMunicipios()).gerarResultados()
  console.log('')

  console.log('Gerando resultados (Buscar todos os municipios)...')
  await (new GerarResultadosBuscarTodosMunicipios()).gerarResultados()
  console.log('')

  console.log('Gerando resultados (Buscar municipios com condicao)...')
  await (new GerarResultadosBuscarMunicipiosComCondicao()).gerarResultados()
  console.log('')

  console.log('Gerando resultados (Alterar municipios com condicao)...')
  await (new GerarResultadosAlterarMunicipiosComCondicao()).gerarResultados()
  console.log('')

  console.log('Gerando resultados (Excluir municipios com condicao)...')
  await (new GerarResultadosExcluirMunicipiosComCondicao()).gerarResultados()
  console.log('')

  console.log('Gerando resultados (Buscar estado pelo municipio)...')
  await (new GerarResultadoBuscarEstadoPeloMunicipio()).gerarResultados()
  console.log('')

  console.log('--------------')
  console.log('Testes realiazados com sucesso')
}

init()
