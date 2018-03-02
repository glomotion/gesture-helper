'use strict';

const config = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

config.output.filename = '[name].min.js';
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
