"use strict";

const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    index: "./src/gesture-helper.ts",
  },
  mode: "production",
  output: {
    path: require("path").resolve("./dist/"),
    filename: "[name].js",
    library: "GestureHelper",
    libraryTarget: "umd",
    libraryExport: "default",
    umdNamedDefine: true,
  },
  resolve: {
    modules: ["node_modules"],
    descriptionFiles: ["package.json"],
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
    ],
  },
};
