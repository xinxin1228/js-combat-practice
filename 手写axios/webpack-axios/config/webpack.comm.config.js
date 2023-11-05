const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new NodePolyfillPlugin()
  ],
  devtool: 'source-map'
}
