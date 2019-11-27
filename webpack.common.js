const path = require('path');
const fs = require('fs');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const IconfontPlugin = require('iconfont-plugin-webpack');

const htmlDir = './src/';

const htmlPlugins = function () {
    const htmlFiles = fs.readdirSync(path.resolve(__dirname, htmlDir));
    return htmlFiles.filter(
        function (fileName) {
            return path.extname(fileName) === '.html'
        }
    ).map(item => {
        return new HtmlWebpackPlugin({
            title: item.split('.')[0],
            filename: item,
            template: htmlDir + item,
            inject: 'body'
        });
    })
}();


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.txt$/,
            use: 'raw-loader'
        },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: false,
                    }
                }]
            },
            {
                test: /\.(jpe?g|png|svg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        // publicPath: '../images/'
                        publicPath: (url, resourcePath, context) => {

                            if (/bg/.test(resourcePath)) {
                                return `../images/${url}`;
                            }

                            return `images/${url}`;
                        },
                    }
                }]
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: '../fonts/'
                    }
                }]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: htmlPlugins.concat([
        new CleanWebpackPlugin(['dist']),
      /*  new IconfontPlugin({
            src: './src/icons',
            family: 'iconfont',
            dest: {
                font: './src/fonts/[family].[type]',
                css: './src/styles/_iconfont_[family].scss'
            },
            watch: {
                pattern: './src/icons/!*.svg'
            },
            cssTemplate:require('./src/scripts/iconfontTemplate')
        }),*/
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.min.css',
            chunkFilename: '[id].min.css'
        }),

    ]),
    output: {
        filename: 'js/script.min.js',
        path: path.resolve(__dirname, 'dist'),

    }
};
