<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
 
## Description

[Nest](https://github.com/nestjs/nest) This is a proyect for subscripcions

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## What do you need for create this proyect?
1. Install the Nest CLI , that is the framework

```
npm i -g @nestjs/cli
```


2. Clone the repository

```
  git clone "Url del repositorio"

```

3. Inside the proyect, Install the dependencias

```
pnpm install

```



4. Install the database (MongoDB) with Docker Compose

```
docker-compose up -d

```

5. Ejecutar el proyecto 


```
pnpm run start:dev

```


## What is the name of the endpoints? (¿ Como estan nombrados los endpoints ?)



1. Realizar el get de los servicios(Get)

```
http://localhost:3000/api/v1/subscription

```


2. Registrar un servicio(Post)

```
http://localhost:3000/api/v1/subscription

```

Que datos se deben enviar para registrar un servicio:

```

{
  "subscriptionId": "sub_123456",
  "subscriptionName": "EmpresaDeEjemplo",
  "company": "Empresa XYZ",
  "price": 49,
  "status": true,
  "subscriptionStartDate": "2023-10-01T00:00:00Z",
  "subscriptionInterval": "mensual",
  "mail": "usuario@example.com",
  "password": "ContraseñaSegura123!",
  "paymentMethod": "tarjeta_credito",
  "lastReminderDate": "2023-09-25T00:00:00Z",
  "subscriptionEndDate": "2023-11-01T00:00:00Z"
}


```


## STACK Utilizado


* MongoDB
* Nest