# nuxt-boilerplate
Nuxt boilerplate based on https://github.com/nuxt/create-nuxt-app

## Build Setup

$NAME_PROJECT - это имя проекта, на которое вы должны заменить

``` bash
# Установить зависимости
$ yarn

# Запуск локального сервера
$ yarn dev

# Собрать и запустить продакшен версию
$ yarn build
$ yarn start

# Собрать и запустить продакшен версию через pm2 на деве
# Когда админы глобально установят, pm2 можно будет запускать без npx
$ yarn build
$ npx pm2 start

# Показать информацию о процессе через ID
$ npx pm2 show 0

# Перезапустить процесс через ID
$ npx pm2 reload 0

# Удалить процесс через ID
$ npx pm2 delete 0

# Быстрый запуск на сервере
$ npx pm2 del $NAME_PROJECT && yarn && yarn build && npx pm2 start
    или
$ yarn deploy
```

Более подробно про PM2: [PM2](http://pm2.keymetrics.io/)
Более подробно про Nuxt: [Nuxt.js docs](https://nuxtjs.org).

## SVG

Поставлен новый плагин, так что отмечаем баги.
- Если вдруг нет цвета при установлении currentColor для иконки на IE11, можно указать цвет в fill или stroke что необходимо.
