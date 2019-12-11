<div style="text-align:center"><h1>📚INFORM.ED API📚</h1>
<p>API Integration for the Front-end applcation using <a href="https://nestjs.com" alt="Backend API">NestJS</a> to make scalable applications</p></div>

## :rotating_light: Notice!

> This is still in-progress, and is not ready for beta phase yet. There are missing tables and api documentations needed to write up before deploying it to other service providers.

## :thinking: Why?

To make integration easier than to create a dummy frontend data. Nest Js proves to be more productive and scalable with the tools built in to it. The framework embraces architecture such as:

- ♻ [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)(Default)
- 🎯 [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- 🧪[TDD](https://en.wikipedia.org/wiki/Test-driven_development)
- 🦠[Microservices](https://microservices.io/).
  > The goal of the project is to make the implementation flexible and easy to set-up

## Technologies

- 🐱[NestJs](https://nestjs.com)
- 🌱[MongoDB](https://mongodb.com)
- 🦆[Mongoose](https://mongoosejs.com)
- 🌀[TypeORM](https://typeorm.io)(SOON)
- 😎[Swagger](https://swagger.io)
- 🦠[Microservices from Nestjs](https://microservices.io/)

### Installation

**Download the following**
> Be sure to check the documentation on how to install the following tools.

- [nodejs](https://nodejs.org)
- [yarn](https://yarnpkg.com)
- [mongodb](https://mongodb.com)
- [nestjs](https://nestjs.com)

### Steps:
1. Nodejs - be sure to type `npm --version` and `node --version`

```sh
  # Node Version
  npm --version
  # 12.x.x

  node --version
  # 8.x.x
```
2. Yarn
```sh
  #Yarn version
  yarn --version
```

### Environment Variables
If you know how to setup mongodb or any other database, be sure to have their address stored in your `.env` file

> **Note**
> Don't Put Environment variables in your repository

**`development.env`**
```env
MONGODB_URI=mongo://localhost:27017
```
