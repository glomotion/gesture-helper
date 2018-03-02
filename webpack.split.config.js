'use strict';

const config = require('./webpack.config.js');
const webpack = require('webpack');
const path = require('path');

config.plugins = [
  // keep module.id stable when vendor modules does not change
  new webpack.HashedModuleIdsPlugin(),
  // enable scope hoisting
  new webpack.optimize.ModuleConcatenationPlugin(),
  // split vendor js into its own file
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks (module) {
      // any required modules inside node_modules are extracted to vendor
      return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        (module.resource.indexOf(path.join(__dirname, 'node_modules')) === 0
          || module.resource.indexOf('-polyfill') !== -1)
      )
    }
  }),
  // This instance extracts shared chunks from code splitted chunks and bundles them
  // in a separate chunk, similar to the vendor chunk
  // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
  new webpack.optimize.CommonsChunkPlugin({
    name: 'bundle',
    async: 'vendor-async',
    children: true,
    minChunks: 3
  }),
]

module.exports = config;
