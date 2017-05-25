const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const webpack = require('webpack');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = () => {
  const prod = webpackMerge(baseConfig(), {
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            postcss: [require('autoprefixer')()],
            loaders: {
              css: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'vue-style-loader',
              }),
            },
          },
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [resolve('src')]
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: 'css-loader',
          }),
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[hash].[ext]',
          },
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'stylesheets/[name].[contenthash].css',
      }),
      new WebpackChunkHash(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ],
  });

  return prod;
};
