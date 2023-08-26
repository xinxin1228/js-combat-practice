const { merge } = require('webpack-merge')
const webpackCommConfig = require('./webpack.comm.config')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(webpackCommConfig, {
  mode: 'development',
  devServer: {
    // open: true,
    port: 8080,
    hot: true
  }
})
