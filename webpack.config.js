const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack')

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

  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    // new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`,
    }),
  ],


  devServer: {
    hot: true,
    contentBase: './dist',
  },
  devtool: 'eval-source-map',
}
