module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/mthtml/' : '/',
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  },
  devServer: {
    // proxy: 'http://localhost:4000'
    proxy: {
      '/invitation': {
        target: 'http://192.168.2.121:8808/',
        ws: true,
        changeOrigin: true
      },
      '/img': {
        target: 'http://192.168.2.121:8808/'
      }
    }
  }
}

// http://192.168.2.136:8808/invitation/pushSMS/phoneCodeSend
