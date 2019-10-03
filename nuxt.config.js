const fs = require('fs');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const pkg = require('./package');

const configDefaultPath = './config/config-default.json';
const configPath = './config/config.json';
// eslint-disable-next-line import/no-dynamic-require
const external = fs.existsSync(configPath) ? require(configPath) : require(configDefaultPath);

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  server: {
    port: 3000,
  },

  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  **
  ** Эти стили будут глобально установлены для всего приложении один раз
  */
  css: [
    'vue-multiselect/dist/vue-multiselect.min.css',
    'node_modules/swiper/css/swiper.min.css',
    '@/assets/styl/fonts.styl',
    '@/assets/styl/global.styl',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/generalComponents',
    '@/plugins/axios',
    {
      src: '@/plugins/datepicker',
      mode: 'client',
    },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/proxy',
    ['nuxt-svg-sprite-module', {
      directory: '/assets/ico',
      options: {
        // Configuration options:
        // https://github.com/jkphl/svg-sprite#configuration-basics
      },
    }],
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 60,
    }],
  ],
  /*
  ** Styles for each component
  **
  ** Эти стили будут добавляться в каждый компонент
  */
  styleResources: {
    stylus: [
      '@/assets/styl/variables.styl',
      '@/assets/styl/mixins.styl',
    ],
  },
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: external.baseURL,
    proxy: true,
    // See https://github.com/nuxt-community/axios-module#options
  },

  proxy: external.proxy,

  router: {
    linkActiveClass: '_active',
  },

  /*
  ** Build configuration
  */
  build: {
    // Транспилит только в продакшен билде!
    // Поэтому в дев-билде падает js в IE из-за Свайпера
    transpile: [
      'swiper',
      'dom7',
      'yallist',
      'vClickOutside',
    ],

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            formatter: eslintFriendlyFormatter,
          },
        });
      }
    },
  },
};
