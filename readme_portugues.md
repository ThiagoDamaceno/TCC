# Resumo

Este artigo tem como objetivo comparar a performance dos sistemas gerenciadores de banco de
dados (SGBDs) PostgreSQL e MongoDB, analisando as principais operações de persistência
de dados. A fim de conhecer as principais abordagens utilizadas pelos SGBDs deste artigo,
foram revistos alguns conceitos referentes a SGBDs relacionais e orientados a documentos.
Para realizar as análises de performance, um ambiente de testes foi construído com a linguagem
de programação Typescript, visando automatizar as análises e gerar os resultados. Através dos
testes realizados, pôde-se notar que o PostgreSQL é mais performático na consulta de dados
relacionados e em inserções, já o MongoDB se sobressai em operações que envolvam alguma
condição ou filtro de busca, sejam elas consultas, alterações ou exclusões.


## Dependências
- nodejs
- npm ou yarn
- docker
- docker-compose

<br>

### Iniciando os containers dos bancos de dados

``
docker-compose up
``

<br>

### Instalando dependências do nodejs

``
yarn install
``

ou

``
npm install
``

<br>

### Executando o projeto

``
yarn start
``

ou

``
npm start
``
