# Resumo / Abstract

Este artigo tem como objetivo comparar a performance dos sistemas gerenciadores de banco de
dados (SGBDs) PostgreSQL e MongoDB, analisando as principais operações de persistência
de dados. A fim de conhecer as principais abordagens utilizadas pelos SGBDs deste artigo,
foram revistos alguns conceitos referentes a SGBDs relacionais e orientados a documentos.
Para realizar as análises de performance, um ambiente de testes foi construído com a linguagem
de programação Typescript, visando automatizar as análises e gerar os resultados. Através dos
testes realizados, pôde-se notar que o PostgreSQL é mais performático na consulta de dados
relacionados e em inserções, já o MongoDB se sobressai em operações que envolvam alguma
condição ou filtro de busca, sejam elas consultas, alterações ou exclusões.

/ 

This article aims to compare the performance of the Databases management systems (DBMSs)
PostgreSQL and MongoDB, analysing the main data persistence operations. Aiming at knowing
the main approaches used by the relational and document-oriented DBMSs of this article, was
revised some related concepts of relational and document-oriented DBMSs. To make the
performance analyses, a test enviromment was built using the Typescript programming language,
with the objective of automate the analyzes and generate de results. Throught the executed tests, it
could be noted that the PostgreSQL is more performative in data relational queries and insertions,
already the MongoDB stands out in oparations that contain some condition or search filter, wheter
in queries, updates or deletes.

<br>

## Dependências / Dependencies
- nodejs
- npm ou yarn
- docker
- docker-compose

<br>

### Iniciando os containers dos bancos de dados / Initializing the databases containers

``
docker-compose up
``

<br>

### Instalando dependências do nodejs / installing nodejs dependencies

``
yarn install
``

ou / or

``
npm install
``

<br>

### Executando o projeto / Running the project

``
yarn start
``

ou / or

``
npm start
``
