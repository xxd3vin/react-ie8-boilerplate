const path = require('path');
const webpack = require('webpack');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pkg = require('./package.json');

const banner = `
   ${pkg.name} - ${pkg.description}
   Author: ${pkg.author}
   Version: v${pkg.version}
   URL: ${pkg.homepage}
   License(s): ${pkg.license}
`;

module.exports = {
  entry: {
    'MyExpBillPortlet': [
      './src/MyExpBillPortlet'
    ],
    'entry': [
      './src/entry.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'patch/replacement/hotwebs/iwebap/js/portalbillquery'),
    filename: '[name].js', // Template based on keys in entry above
    publicPath: '/iwebap/js/portalbillquery/'
  },
  plugins: [
    //new webpack.EvalSourceMapDevToolPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    /**
     * This plugin assigns the module and chunk ids by occurence count. What this
     * means is that frequently used IDs will get lower/shorter IDs - so they become
     * more predictable.
     */
    new webpack.optimize.OccurrenceOrderPlugin(),
    /**
     * See description in 'webpack.config.dev' for more info.
     */
    new webpack.DefinePlugin({
        '__DEV__': false,
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new es3ifyPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.BannerPlugin(banner),
    // Copy assets to patch dir
    // From ${from} to ${output.path}/${to}
    new CopyWebpackPlugin([
      {
        from: 'client/nchome/hotwebs/iwebap'
        ,to: path.join(__dirname, 'patch/replacement/hotwebs/iwebap')
      }
    ])
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        include: __dirname
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.(png|jpg|bmp)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  }
};
