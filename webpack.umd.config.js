'use strict';

const config = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

config.output.library = 'GestureHelper';
config.output.libraryTarget = 'umd';
config.output.libraryExport = 'default';
config.output.umdNamedDefine = true;
config.output.filename = 'umd.js';

config.plugins = [
	new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        warnings: false,
        drop_console: true,
      },
      comments: false,
    },
    sourceMap: true,
    parallel: true
  }),
];

module.exports = config;
