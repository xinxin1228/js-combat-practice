const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.comm.config')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(commonConfig, {
  mode: 'development',
  devServer: {
    port: 8080,
    hot: true,
    open: true
  }
})
