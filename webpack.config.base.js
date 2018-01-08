/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
require("dotenv").config({path: ".env" });

import { dependencies as externals } from './app/package.json';

import appConf from './config/default/app.js'

export default {
  externals: Object.keys(externals || {}),

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets:['react']
        }
      }
    }]
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'renderer.dev.js',
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, 'app'),
      'node_modules',
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(appConf.app.env || 'production')
    }),

    new webpack.DefinePlugin({ "global.GENTLY": false }),
    
    new webpack.NamedModulesPlugin(),
  ],
};
