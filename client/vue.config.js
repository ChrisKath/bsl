module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Brand Short Link Project | Private Web App (Remastered)'
        return args
      })
  },

  assetsDir: 'static',
  lintOnSave: (process.env.NODE_ENV !== 'production'),
  runtimeCompiler: true,

  css: {
    sourceMap: true
  }
}