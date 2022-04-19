# Testes automatizados com Cypress - Básico
## Aprendizagem do curso

- Como configurar um projeto Cypress do zero;
- Como visitar páginas locais e remotas;
- Como lidar com os elementos mais comuns encontrados em aplicações web;
- Como testar _upload_ de arquivos;
- Como realizar as mais diversas verificações de resultados esperados;
- Como criar comandos customizados;
- Como lidar com links que abrem em outra aba do navegador;
- Como rodar testes simulando as dimensões de um dispositivo móvel;
- Como resolver os mesmos problemas de diferentes formas, conhecendo a [API do Cypress](https://docs.cypress.io/api/table-of-contents);
- Como executar os testes em um _pipeline_ de integração contínua sempre que mudanças ocorrerem no código da aplicação (ou dos testes);
- Como criar uma documentação mínima para seu projeto de testes automatizados;

### Pré-requisitos

Primeiramente, é necessário instalar a versão mais recente do [Node.js](https://nodejs.org/en/download/)

Comando para iniciarmos um projeto node do npm, para não precisarmos responder algumas perguntas do projeto:

`npm init --yes`

Para este projeto foi utilizado a versão '9.5.1' do Cypress.io
Para inicializar o projeto, basta digitar no terminal (dentro da pasta do projeto):

`npm install -D cypress@9.5.1 --save-dev`

### Execução dos testes

Você pode executar os testes via desktop ou mobile.

#### Desktop

`npm run cy:open` -> Execução dos testes com interação do navegador

`npm run cy:run` -> Execução dos testes sem interação navegador (modo headless)

#### Mobile 

`npm run cy:open:mobile` -> Execução dos testes com interação do navegador

`npm run cy:run:mobile` -> Execução dos testes sem interação navegador (modo headless)

