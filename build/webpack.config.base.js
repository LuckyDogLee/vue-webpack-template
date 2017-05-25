const webpack = require('webpack');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  const base = {
    entry: {
      main: './src/main.js',
      vendor: './src/vendor.js',
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
        minChunks: Infinity,
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new ChunkManifestPlugin({
        filename: 'chunkManifest.json',
        manifestVariable: 'webpackManifest',
      }),
    ],
  };

  return base;
};
