const path = require('path')
const { merge } = require('webpack-merge')
const webpackCommConfig = require('./webpack.comm.config')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(webpackCommConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    filename: 'axios.min.js',
    sourceMapFilename: 'axios.min.map',
    libraryTarget: 'umd',
    library: 'axios',
    libraryExport: 'default'
  }
})
