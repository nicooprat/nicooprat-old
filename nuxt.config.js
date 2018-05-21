const env = require('./settings.js')

module.exports = {
  env,
  /*
  ** Headers of the page
  */
  head: {
    title: 'nicooprat',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Designer & développeur front-end' },
      { name: 'msapplication-TileColor', content: '#4c91dd' },
      { name: 'theme-color', content: '#ffffff' },
    ],
    link: [
      { rel:'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel:'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel:'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel:'manifest', href: '/site.webmanifest' },
      { rel:'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Arvo:400,700|Roboto:400,700,900' },
    ],
  },
  css: [
    // {src: 'normalize/normalize.css'}
  ],
  /*
  ** Customize the progress bar color
  */
  loading: false,
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
