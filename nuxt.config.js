const pkg = require('./package');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.2/js/swiper.min.js' },
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  // Styles for each page
  css: [
    '@/assets/sass/fonts.sass',
    '@/assets/sass/global.sass',
    'node_modules/swiper/dist/css/swiper.min.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    'nuxt-sass-resources-loader',
  ],
  // Styles for each component
  sassResources: [
    '@/assets/sass/variables.sass',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  router: {
    linkActiveClass: '_active',
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-url': {},
        autoprefixer: {},
      },
    },
    babel: {
      presets: [
        ['@nuxtjs/babel-preset-app', {
          targets: { ie: 11 },
        },
        ],
      ],
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            formatter: require('eslint-friendly-formatter'),
          },
        });
      }
    },
  },
};
