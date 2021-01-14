module.exports = {
  devServer: {
    host: ""
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
          args[0].title = 'Abacus MA'
          return args
        })
  }
}
