/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';

// Компоненты общего назначения
const requireComponent = require.context(
  // Относительный путь до каталога компонентов
  '../components/general/',
  // Обрабатывать или нет подкаталоги
  false,
  // Регулярное выражение для определения файлов базовых компонентов
  /App[A-Z]\w+\.(vue|js)$/,
);

requireComponent.keys().forEach(fileName => {
  // Получение конфигурации компонента
  const componentConfig = requireComponent(fileName);

  // Получение имени компонента в PascalCase
  const componentName = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')
    .match(/[A-Z][a-z]+/g)
    .join('-')
    .toLowerCase();

  Vue.component(
    componentName,
    // Поиск опций компонента в `.default`, который будет существовать,
    // если компонент экспортирован с помощью `export default`,
    // иначе будет использован корневой уровень модуля.
    componentConfig.default || componentConfig,
  );
});
