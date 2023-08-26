const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

const resolvePath = (path) => resolve(__dirname, path)

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath('../index.html')
    })
  ]
}
