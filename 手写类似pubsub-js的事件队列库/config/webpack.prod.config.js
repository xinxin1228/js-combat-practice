const path = require('path')
const { merge } = require('webpack-merge')
const webpackCommConfig = require('./webpack.comm.config.js')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(webpackCommConfig, {
  mode: 'production',
  output: {
    clean: true,
    path: path.resolve(__dirname, '../dist')
  }
})
