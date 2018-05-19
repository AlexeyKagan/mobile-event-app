const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack.base');

const API_PROXY = 'http://localhost:8085';

const devConfig = {
  devtool: 'source-map',

  devServer: {
    proxy: {
      '/api': API_PROXY
    }
  },
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'react-hot-loader/patch',
    path.resolve(__dirname, './../src/client/app/index.jsx')
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = merge(baseConfig, devConfig);
