'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    index: './src/gesture-helper.js',
  },
  output: {
    path: require('path').resolve('./dist/'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/',
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    descriptionFiles: ['package.json'],
  },
  plugins: [],
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
