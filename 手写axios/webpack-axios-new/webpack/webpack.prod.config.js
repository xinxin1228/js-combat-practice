const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.comm.config')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    clean: true,
    path: path.resolve(__dirname, '../dist'),
    filename: 'axios.min.js', // 输出的文件名
    sourceMapFilename: 'axios.min.map', // map文件名
    library: 'axios', // 类库的命名空间，如果通过网页的方式引入，则可以通过window.axios访问它
    libraryTarget: 'umd', // 定义打包方式Universal Module Definition,同时支持在CommonJS、AMD和全局变量使用
    libraryExport: 'default' // 对外暴露default属性，就可以直接调用default里的属性
  }
})
