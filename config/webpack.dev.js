const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: '../dist',
    port: 8080,
    historyApiFallback: true,
    open: true,
  },
  output: {
    filename: '[name].bundle.js',
    pathinfo: false,
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  optimization: {
    runtimeChunk: true,
  },
});
