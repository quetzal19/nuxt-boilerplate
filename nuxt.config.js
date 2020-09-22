import eslintFriendlyFormatter from 'eslint-friendly-formatter';
import fs from 'fs';

const envName = fs.existsSync('.env') ? '.env' : '.env.example';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({
  path: envName,
});

export default {
  server: {
    port: process.env.SERVER_PORT,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/fonts.scss',
    '@/assets/scss/global.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // Doc: https://github.com/AlexandreBonaventure/vue-mq
    '@/plugins/device-detect',
    '@/plugins/set-meta',
    '@/plugins/generalComponents',
    // Doc: https://element.eleme.io/#/en-US/
    '@/plugins/element-ui',
    // Doc: https://github.com/jonathantneal/svg4everybody
    {
      src: '@/plugins/svg4everybody',
      ssr: false,
    },
    // Doc: https://github.com/aFarkas/lazysizes
    {
      src: '@/plugins/vue-lazysizes',
      ssr: false,
    },

    // Ниже идут плагины модулей аналитики
    ...(process.env.YANDEX_METRICA ? [
      {
        src: '@/plugins/yandexMetricaInit',
        ssr: false,
      },
    ] : [{}]),
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: Дмитрий Куликов :)
    '~/modules/imageWebPConvert.js',
    // Подключение аналитики, если передан GOOGLE_ANALYTICS, но не передан GTM
    // или включенна Электронная Торговля, даже при включённом gtm
    // https://github.com/nuxt-community/analytics-module
    ...(process.env.GOOGLE_ANALYTICS && (!process.env.GTM || process.env.GOOGLE_ANALYTICS_ECOMMERCE === 'true')
      ? ['@nuxtjs/google-analytics'] : []),
  ],

  /*
   * Настройка GTM
   */
  ...(process.env.GTM ? {
    'google-gtag': {
      id: process.env.GTM,
      debug: process.env.DEBUG === 'true',
    },
  } : {}),

  /*
   * Настройка гугл аналитики, при выключенном gtm
   */
  ...(process.env.GOOGLE_ANALYTICS && !process.env.GTM ? {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS,
      debug: {
        enabled: process.env.DEBUG === 'true',
        sendHitTask: process.env.DEBUG === 'true',
      },
      ecommerce: {
        enabled: process.env.GOOGLE_ANALYTICS_ECOMMERCE === 'true',
      },
      autoTracking: {
        screenview: true,
        page: true,
      },
      checkDuplicatedScript: true,
    },
  } : {}),

  /*
   * Настройка ЭТ через googleAnalytics, при включенном gtm
   */
  ...(process.env.GOOGLE_ANALYTICS && process.env.GTM && process.env.GOOGLE_ANALYTICS_ECOMMERCE === 'true' ? {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS,
      ecommerce: {
        enabled: true,
      },
      autoTracking: {
        screenview: false,
        page: false,
      },
      checkDuplicatedScript: true,
    },
  } : {}),

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/fukuiretu/nuxt-user-agent#readme
    'nuxt-user-agent',
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://pwa.nuxtjs.org/
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://www.npmjs.com/package/@nuxtjs/svg-sprite
    '@nuxtjs/svg-sprite',
    // Doc: https://www.npmjs.com/package/@nuxtjs/component-cache
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 60,
    }],
    // Подключение gtm если в .env передан gtm
    // https://github.com/nuxt-community/google-gtag
    ...(process.env.GTM ? ['@nuxtjs/google-gtag'] : []),
  ],
  /*
   ** Styles for each component
   **
   ** Эти стили будут добавляться в каждый компонент
  */
  styleResources: {
    scss: [
      '@/assets/scss/variables.scss',
      '@/assets/scss/mixins.scss',
    ],
  },
  /*
  **  Конфигурация Dotenv
  */
  dotenv: {},
  /*
  ** Конфигурация PWA
  */
  pwa: {
    workbox: {},
    meta: {
      theme_color: '#000000',
      lang: 'ru',
      nativeUI: true,
    },
    icon: {},
    manifest: {
      name: 'name',
      lang: 'ru',
      display: 'standalone',
    },
  },
  /*
  ** Конфигурация SVG
  */
  svgSprite: {
    input: '~/assets/ico',
    output: '~/assets/ico/gen',
  },
  /*
  ** Ax  ios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.baseURL,
    proxy: true,
  },
  /*
  ** as proxy configuration
  */
  proxy: {
    '/api': {
      target: process.env.PROXY_API_TARGET,
      auth: process.env.PROXY_API_AUTH,
    },
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, { isDev, isClient, loaders: { vue } }) {
      const Vueobject = vue;
      if (isClient) {
        Vueobject.transformAssetUrls.img = ['data-src', 'src'];
        Vueobject.transformAssetUrls.source = ['data-srcset', 'srcset'];
      }
      if (isDev && isClient) {
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
