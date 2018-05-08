const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/index.jsx',
    // vue: 'vue',
  },

  output: {
    filename: '[name].[chunkhash].js',
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
      vue$: 'vue/dist/vue.esm.js',
    },
  },

  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`,
    }),
  ],


  devServer: {
    contentBase: './dist',
  },
  devtool: 'eval-source-map',
}
