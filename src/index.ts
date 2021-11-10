import { CriarEstados } from './repositorios/postgres/tabelas/CriarEstados'

import * as dotenv from 'dotenv'
import { TestInsertVarioEstadosMongo } from './testes/inserirTodos/Estados/TestInsertVarioEstadosMongo'
import { TestInserirVariosEstadosPostgres } from './testes/inserirTodos/Estados/TestInserirVariosEstadosPostgres'
import { TestBuscarTodosEstadosMongo } from './testes/buscarTodos/Estados/TestBuscarTodosEstadosMongo'
import { TestBuscarTodosEstadosPostgres } from './testes/buscarTodos/Estados/TestBuscarTodosEstadosPostgres'
import { TestBuscarPeloNomeMongo } from './testes/buscarComCondicao/TestBuscarPeloNomeMongo'
import { TestBuscarEstadoPeloNomePostgres } from './testes/buscarComCondicao/TestBuscarEstadoPeloNomePostgres'
import { TestAlterarEstadoPeloNomeMongo } from './testes/alterarComCondicao/Estados/TestAlterarEstadoPeloNomeMongo'
import { TestAlterarEstadoPeloNomePostgres } from './testes/alterarComCondicao/Estados/TestAlterarEstadoPeloNomePostgres'
import { TesteInsertVariosMunicipiosMongo } from './testes/inserirTodos/Municipios/TesteInsertVariosMunicipiosMongo'
import { TesteInsertVariosMunicipiosPostgres } from './testes/inserirTodos/Municipios/TesteInsertVariosMunicipiosPostgres'
dotenv.config()

class Index {
  async createDatabases (): Promise<void> {
    await (new CriarEstados()).createIfNotExists()
  }

  async executeTestsInsertAll (): Promise<void> {
    const timeMillisecondsInsertAllMongo = await (new TestInsertVarioEstadosMongo()).getInMilliseconds()
    console.log(`Tempo gasto insert all mongo: ${timeMillisecondsInsertAllMongo}ms`)

    const timeMillisecondsInsertAllPostgres = await (new TestInserirVariosEstadosPostgres()).getInMilliseconds()
    console.log(`Tempo gasto insert all postgres: ${timeMillisecondsInsertAllPostgres}ms`)
  }

  async executeTestsFindAll (): Promise<void> {
    const timeMillisecondsInsertAllMongo = await (new TestBuscarTodosEstadosMongo()).getInMilliseconds()
    console.log(`Tempo gasto find all mongo: ${timeMillisecondsInsertAllMongo}ms`)

    const timeMillisecondsInsertAllPostgres = await (new TestBuscarTodosEstadosPostgres()).getInMilliseconds()
    console.log(`Tempo gasto find all postgres: ${timeMillisecondsInsertAllPostgres}ms`)
  }

  async executeTestsFindByName (): Promise<void> {
    const tempoEmMilisegundosMongo = await (new TestBuscarPeloNomeMongo()).getInMilliseconds()
    console.log(`Tempo gasto find by nome mongo: ${tempoEmMilisegundosMongo}ms`)

    const tempoEmMilisegundosPostgres = await (new TestBuscarEstadoPeloNomePostgres()).getInMilliseconds()
    console.log(`Tempo gasto find by nome postgres: ${tempoEmMilisegundosPostgres}ms`)
  }

  async executeTestsUpdateByName (): Promise<void> {
    const tempoEmMilisegundosMongo = await (new TestAlterarEstadoPeloNomeMongo()).getInMilliseconds()
    console.log(`Tempo gasto update by nome mongo: ${tempoEmMilisegundosMongo}ms`)

    const tempoEmMilisegundosPostgres = await (new TestAlterarEstadoPeloNomePostgres()).getInMilliseconds()
    console.log(`Tempo gasto update by nome postgres: ${tempoEmMilisegundosPostgres}ms`)
  }

  async executeTestesInserirTodosMunicipios (): Promise<void> {
    const tempoEmMilisegundosMongo = await (new TesteInsertVariosMunicipiosMongo()).getInMilliseconds()
    console.log(`Tempo gasto inserir todos mongo: ${tempoEmMilisegundosMongo}ms`)

    const tempoEmMilisegundosPostgres = await (new TesteInsertVariosMunicipiosPostgres()).getInMilliseconds()
    console.log(`Tempo gasto inserir todos postgres: ${tempoEmMilisegundosPostgres}ms`)
  }
}

async function init () {
  console.clear()

  console.log('Testes iniciados')
  console.log('')
}

// eslint-disable-next-line no-unused-vars
async function initTestesInserirTodosMunicipios () {
  const index = new Index()

  await index.createDatabases()

  await index.executeTestesInserirTodosMunicipios()
}

init()
initTestesInserirTodosMunicipios()
