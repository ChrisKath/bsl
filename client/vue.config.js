const webpack = require('webpack')
const path = require('path')

module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = process.env.VUE_APP_WEB_TITLE
        return args
      })
  },

  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  },

  assetsDir: 'static',
  outputDir: path.resolve(__dirname, '../server/public'),
  lintOnSave: (process.env.NODE_ENV === 'development'),
  runtimeCompiler: true,

  css: {
    sourceMap: true
  }
}