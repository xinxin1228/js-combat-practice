const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

const resolvePath = (path) => resolve(__dirname, path)

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: resolvePath('../src/index.js'),
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath('../index.html')
    })
  ]
}
