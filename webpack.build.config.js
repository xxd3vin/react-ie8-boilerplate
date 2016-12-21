const path = require('path');
const webpack = require('webpack');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('./package.json');

const banner = `
   ${pkg.name} - ${pkg.description}
   Author: ${pkg.author}
   Version: v${pkg.version}
   URL: ${pkg.homepage}
   License(s): ${pkg.license}
`;

var autoprefixer = require('autoprefixer')

var webConf = pkg.webConfig
var source_path = path.resolve('./src')

module.exports = {
  entry: {
    'MyExpBillPortlet': [
      './src/entry.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'patch/replacement/hotwebs/iwebap/js/portalbillquery'),
    filename: '[name].js', // Template based on keys in entry above
    publicPath: '/iwebap/js/portalbillquery/'
  },
  resolve: {
      // 别名定义
      alias: {
          constants: source_path+'/constants',
          helpers: source_path+'/helpers',
          components: source_path+'/components'
      },
      extensions: ['', '.js', '.jsx', '.css', '.less'],
      root: [path.resolve('./src'), path.resolve('./node_modules')]
  },
  postcss: function() {
      return [autoprefixer]
  },
  plugins: [
    new ExtractTextPlugin('../../css/portalbillquery/app.css'),
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
      noParse: [
          // 不转换
      ],
      loaders: [
          // {
          //     test: /\.html$/,
          //     loader: 'file?name=[name].[ext]'
          // },
          {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
          },
          {
              test: /\.less$/,
              loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
          },
          {
              test: /\.(gif|jpg|png)\??.*$/,
              loader: 'url-loader?limit=10000&name=[name].[ext]'
          },
          {
              test: /\.(woff|svg|eot|ttf)\??.*$/,
              loader: 'url-loader?limit=10000&name=[name].[ext]'
          },
          {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel',
              query: {
                  presets: ['react', 'es2015', 'stage-2'],
                  cacheDirectory: true
              }
          }
      ],
      postLoaders: [
        {
          test: /\.js$/,
          loaders: ['es3ify-loader'],
        }
      ]
  }
};
