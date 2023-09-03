const { merge } = require('webpack-merge')
const webpackCommConfig = require('./webpack.comm.config.js')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(webpackCommConfig, {
  mode: 'development'
  // devServer: {
  //   port: 8080,
  //   hot: true
  // }
})
