const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const TerserPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');


const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
// const OfflinePlugin = require('offline-plugin');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        sourceMap: false,
        terserOptions: {
          extractComments: 'all',
          compress: {
            drop_console: true,
          },
        }
      }),
      new OptimizeCSSAssetsPlugin({})

    ]
  },
  plugins: [
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      gifsicle: {
        optimizationLevel: 9
      },
      pngquant: ({
        quality: '50'
      }),
      plugins: [imageminMozjpeg({
        quality: '75'
      })]
    }),
    new FaviconsWebpackPlugin({
      logo: './src/images/favicon.png',
      icons: {
        twitter: true,
        windows: true
      }
    }),
    // new OfflinePlugin()
  ]
});