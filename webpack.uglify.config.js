'use strict';

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/gesture-helper.js',
  output: {
    path: require('path').resolve('./dist/'),
    filename: 'bundle.min.js',
    publicPath: '/',
    library: 'GestureHelper',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    descriptionFiles: ['package.json'],
  },
  plugins: [
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
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: [
            ['es2015', { loose: true }],
          ],
          plugins: [
            'transform-class-properties',
          ]
        }
      }
    ]
  },
};
