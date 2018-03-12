var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, './public/assets');
var APP_DIR = path.resolve(__dirname, './src');

var config = {
  entry: {
    "bundle": APP_DIR + "/index.js",
    "bundle.min": APP_DIR + "/index.js"
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    }),
    new ExtractTextPlugin("bundle.css", {
        allChunks: true
    })
  ],
  module: {
    loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react']
          }
        },
        {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract({
              fallback: 'style-loader', 
              use: 'css-loader'
            })
        },
    ]
  },
};

module.exports = config;