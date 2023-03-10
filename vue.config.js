// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  'publicPath': process.env.NODE_ENV === 'production' ? '/mthtml/' : '/mthtml/',
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV === 'production') {
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
  //   }
  // },
  // pluginOptions: {
  //   'cube-ui': {
  //     postCompile: true,
  //     theme: false
  //   }
  // },
  devServer: {
    // proxy: 'http://localhost:4000'
    // proxy: {
    //   '/invitation': {
    //     target: 'http://www.motooling.com:8809/',
    //     ws: true,
    //     changeOrigin: true
    //   },
    //   '/mtH5': {
    //     target: 'http://www.motooling.com:8809/',
    //     ws: true,
    //     changeOrigin: true
    //   },
    //   '/img': {
    //     target: 'http://www.motooling.com:8809/'
    //   }
    // }
    // proxy: {
    //   '/invitation': {
    //     target: 'http://192.168.2.247:8808/',
    //     ws: true,
    //     changeOrigin: true
    //   },
    //   '/mtH5': {
    //     target: 'http://192.168.2.247:8808/',
    //     ws: true,
    //     changeOrigin: true
    //   },
    //   '/img': {
    //     target: 'http://192.168.2.247:8808/'
    //   }
    // }
  },
  configureWebpack: {
    externals: {
      AMap: 'AMap'
    }
  }
}

// http://192.168.2.136:8808/invitation/pushSMS/phoneCodeSend
