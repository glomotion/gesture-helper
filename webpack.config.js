'use strict';

const webpack = require('webpack');

module.exports = {
  entry: './src/gesture-helper.js',
  output: {
    path: require('path').resolve('./dist/'),
    filename: 'bundle.js',
    publicPath: '/',
    library: 'gesture-helper',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    descriptionFiles: ['package.json'],
  },
  plugins: [
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
        }
      }
    ]
  },
};
