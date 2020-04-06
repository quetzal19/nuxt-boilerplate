module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': '/assets/ico/'
      }
    }
  },
  themeConfig: {
    nav: [
      { text: 'Main', link: '/' },
      { text: 'Icon', link: '/icon/' },
    ]
  }
}
