const webpack = require('webpack');
const merge = require('webpack-merge'); 
const baseConfig = require('./webpack.base');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); 

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false
    }),
  ]
});