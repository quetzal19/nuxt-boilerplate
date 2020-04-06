# Nuxt-Boilerplate

> RATIO Project

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# serve docs
$ yarn docs:dev

# build docs
$ yarn docs:build

# serve with nuxt-server + docs-server 
$ yarn dev:all

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

# deploy
$ yarn deploy 
```

## ENV Setup

```dotenv
# create .env
cp .env.example .env

PROJECT_NAME=Название проекта
SERVER_PORT=Порт сервера
BASE_URL=API URL

PROXY_API_TARGET=PROXY URL
PROXY_API_AUTH=PROXY AUTH

```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
