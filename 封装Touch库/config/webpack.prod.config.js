const { merge } = require('webpack-merge')
const webpackCommConfig = require('./webpack.comm.config.js')
const { resolve } = require('path')

const resolvePath = (path) => resolve(__dirname, path)

/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(webpackCommConfig, {
  mode: 'production',
  output: {
    clean: true,
    path: resolvePath('../dist')
  }
})
