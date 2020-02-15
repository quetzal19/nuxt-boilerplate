/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';

// Плагины
import vClickOutside from 'v-click-outside';
import VModal from 'vue-js-modal/dist/ssr.index';
import Multiselect from 'vue-multiselect';
import Vuebar from 'vuebar';
import Vuelidate from 'vuelidate';
import VTooltip from 'v-tooltip';
import VueTheMask from 'vue-the-mask';

// Полифиллы
import findindexPolyfill from '@/helpers/findindexPolyfill';


// Компоненты общего назначения
const requireComponent = require.context(
  // Относительный путь до каталога компонентов
  '../components/general/',
  // Обрабатывать или нет подкаталоги
  false,
  // Регулярное выражение для определения файлов базовых компонентов
  /App[A-Z]\w+\.(vue|js)$/,
);

requireComponent.keys().forEach((fileName) => {
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

// Плагины
Vue.component('multiselect', Multiselect);

Vue.use(vClickOutside);
Vue.use(VModal, { dynamic: true });
Vue.use(Vuebar);
Vue.use(Vuelidate);
Vue.use(VTooltip);
Vue.use(VueTheMask);

// Полифиллы
findindexPolyfill();
