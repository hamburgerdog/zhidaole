const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const lessAntdModifyVars = require('../src/theme/antd');

module.exports = {
  context: path.join(__dirname, '../src'),
  entry: path.join(__dirname, '../src', 'index.jsx'),
  plugins: [
    new HtmlWebpackPlugin({
      title: 'xjosiah-simple-react-admin_Production',
      template: path.join(__dirname, '../src', 'index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin({
      path: path.join(__dirname, '../dist'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: lessAntdModifyVars,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: path.resolve(__dirname, 'src'),
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.join(__dirname, '../src'),
    },
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
