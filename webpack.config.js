const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const webpack = require('webpack')

const plugins = [
  new HtmlWebpackPlugin({ template: './src/index.html' }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`,
  }),
]

if (process.env.NODE_ENV === 'production') plugins.push(new BundleAnalyzerPlugin())

module.exports = {
  entry: './src/index.jsx',

  output: {
    filename: '[name].[hash].js',
    path: resolve(__dirname, 'dist'),
  },

  module: {
    rules: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'vue-jsx-hot-loader'],
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      vue$: process.env.NODE_ENV === 'production'
        ? 'vue/dist/vue.runtime.esm.js'
        : 'vue/dist/vue.esm.js',
    },
  },

  plugins,

  devServer: {
    hot: true,
    contentBase: './dist',
  },
  devtool: process.env.NODE_ENV !== 'production' && 'eval-source-map',
}
