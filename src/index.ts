import { CriarEstados } from './repositorios/postgres/tabelas/CriarEstados'

import * as dotenv from 'dotenv'
import { TestInsertAllEstadosMongo } from './testes/inserirTodos/Estados/TestInsertAllEstadosMongo'
import { TestInserirVariosEstadosPostgres } from './testes/inserirTodos/Estados/TestInserirVariosEstadosPostgres'
import { TestBuscarTodosEstadosMongo } from './testes/buscarTodos/Estados/TestBuscarTodosEstadosMongo'
import { TestBuscarTodosEstadosPostgres } from './testes/buscarTodos/Estados/TestBuscarTodosEstadosPostgres'
import { TestBuscarPeloNomeMongo } from './testes/buscarComCondicao/TestBuscarPeloNomeMongo'
import { TestBuscarEstadoPeloNomePostgres } from './testes/buscarComCondicao/TestBuscarEstadoPeloNomePostgres'
import { InserirVariosEstadosMongo } from './repositorios/mongo/implementacoes/estados/InserirVariosEstadosMongo'
import { getEstadosInArray } from './dadosParaTestes/getEstadosInArray'
import { Estado } from './modelos/Estado'
import { InserirVariosEstadosPostgres } from './repositorios/postgres/implementacoes/estados/InserirVariosEstadosPostgres'
import { TestAlterarEstadoPeloNomeMongo } from './testes/alterarComCondicao/Estados/TestAlterarEstadoPeloNomeMongo'
import { TestAlterarEstadoPeloNomePostgres } from './testes/alterarComCondicao/Estados/TestAlterarEstadoPeloNomePostgres'
import { BuscarTodosEstadosMongo } from './repositorios/mongo/implementacoes/estados/BuscarTodosEstadosMongo'
import { BuscarTodosEstadosPostgres } from './repositorios/postgres/implementacoes/estados/BuscarTodosEstadosPostgres'
dotenv.config()

class Index {
  async createDatabases (): Promise<void> {
    await (new CriarEstados()).createIfNotExists()
  }

  async executeTestsInsertAll (): Promise<void> {
    const timeMillisecondsInsertAllMongo = await (new TestInsertAllEstadosMongo()).getInMilliseconds()
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
    const timeMillisecondsFindByNomeMongo = await (new TestBuscarPeloNomeMongo()).getInMilliseconds()
    console.log(`Tempo gasto find by nome mongo: ${timeMillisecondsFindByNomeMongo}ms`)

    const timeMillisecondsFindByNomePostgres = await (new TestBuscarEstadoPeloNomePostgres()).getInMilliseconds()
    console.log(`Tempo gasto find by nome postgres: ${timeMillisecondsFindByNomePostgres}ms`)
  }

  async executeTestsUpdateByName (): Promise<void> {
    const timeMillisecondsFindByNomeMongo = await (new TestAlterarEstadoPeloNomeMongo()).getInMilliseconds()
    console.log(`Tempo gasto update by nome mongo: ${timeMillisecondsFindByNomeMongo}ms`)

    const timeMillisecondsFindByNomePostgres = await (new TestAlterarEstadoPeloNomePostgres()).getInMilliseconds()
    console.log(`Tempo gasto update by nome postgres: ${timeMillisecondsFindByNomePostgres}ms`)
  }
}

async function init () {
  console.clear()

  console.log('Testes iniciados')
  console.log('')

  console.log(await (new BuscarTodosEstadosMongo()).execute())
  console.log(await (new BuscarTodosEstadosPostgres()).execute())
}

// eslint-disable-next-line no-unused-vars
async function initTesteInserirTodos () {
  const index = new Index()

  await index.createDatabases()

  await index.executeTestsInsertAll()
}

// eslint-disable-next-line no-unused-vars
async function initTestsFindAll () {
  const index = new Index()

  await index.createDatabases()

  await index.executeTestsFindAll()
}

// eslint-disable-next-line no-unused-vars
async function initTestsFindEstadoByNome () {
  const index = new Index()

  await index.createDatabases()
  const estados: Estado[] = getEstadosInArray()

  await inserirEstados(estados)
  await index.executeTestsFindByName()
}

// eslint-disable-next-line no-unused-vars
async function inserirEstados (estados: Estado[]) {
  await (new InserirVariosEstadosMongo(estados)).execute()
  await (new InserirVariosEstadosPostgres(estados)).execute()
}

// eslint-disable-next-line no-unused-vars
async function initTestsUpdateEstadoByNome () {
  const index = new Index()

  await index.createDatabases()
  const estados: Estado[] = getEstadosInArray()

  await (new InserirVariosEstadosMongo(estados)).execute()
  await (new InserirVariosEstadosPostgres(estados)).execute()

  await index.executeTestsUpdateByName()
}

init()
// initTesteInserirTodos()
