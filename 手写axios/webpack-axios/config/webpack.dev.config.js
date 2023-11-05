const webpack = require('webpack')
const { merge } = require('webpack-merge')
const webpackCommConfig = require('./webpack.comm.config')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(webpackCommConfig, {
  mode: 'development',
  devServer: {
    port: 5200,
    hot: true,
    open: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
