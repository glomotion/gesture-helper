'use strict';

const config = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

config.entry = {
  index: './demo/demo.js',
};
config.devServer = {
  host: 'localhost',
  port: 8080,

  // respond to 404s with index.html
  historyApiFallback: true,
};
config.plugins = [
  new HtmlWebpackPlugin({
    inject: true,
    template: './demo/demo.html',
    cache: false,
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }),
];
module.exports = config;
