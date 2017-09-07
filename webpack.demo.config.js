'use strict';

const config = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

config.entry = './demo/demo.js';
config.devServer = {
  host: 'localhost',
  port: 8080,

  // respond to 404s with index.html
  historyApiFallback: true,
};
config.plugins = [
  new HtmlWebpackPlugin({
    inject: 'body',
    template: './demo/demo.html',
    cache: false
  }),
];
module.exports = config;
