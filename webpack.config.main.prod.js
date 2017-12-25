/**
 * Webpack config for production electron main process
 */

import webpack from 'webpack';
import merge from 'webpack-merge';
import BabiliPlugin from 'babili-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import baseConfig from './webpack.config.base';
import CheckNodeEnv from './internals/scripts/CheckNodeEnv';

import appConf from './config/default/app.js';

CheckNodeEnv('production');

export default merge.smart(baseConfig, {
  devtool: 'source-map',

  target: 'electron-main',

  entry: './app/main.dev',

  // 'main.js' in root
  output: {
    path: __dirname,
    filename: './app/main.prod.js'
  },

  plugins: [
    /**
     * Babli is an ES6+ aware minifier based on the Babel toolchain (beta)
     */
    new BabiliPlugin(),

    new BundleAnalyzerPlugin({
      analyzerMode: appConf.app.openAnalyzer ? 'server' : 'disabled',
      openAnalyzer: appConf.app.openAnalyzer
    }),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(appConf.app.env || 'production'),
      'process.env.DEBUG_PROD': JSON.stringify(appConf.app.debug || 'false')
    })
  ],

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  },
});
