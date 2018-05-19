const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack.base');

const API_PROXY = 'http://localhost:8085';

const devConfig = {
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    proxy: {
      '/api': API_PROXY
    },
    publicPath: '/',
    contentBase: path.resolve('www')
  }
};

module.exports = merge(baseConfig, devConfig);
