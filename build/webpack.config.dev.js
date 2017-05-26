const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = () => {
  const dev = webpackMerge(baseConfig(), {
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          include: [resolve('src')],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[ext]',
          },
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'cheap-module-source-map',
    devServer: {
      hot: true,
      noInfo: true,
      host: '0.0.0.0',
      port: 8080,
      publicPath: '/',
      historyApiFallback: true,
      proxy: {
        '/proxy/api/': {
          target: '',
          pathRewrite: {'^/proxy' : ''},
          logLevel: 'debug',
          changeOrigin: true,
        },
      },
    },
  });

  return dev;
};
