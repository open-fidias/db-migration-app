'use strict'

process.env.BABEL_ENV = 'renderer'

const path = require('path')
const pkg = require('./app/package.json')
const settings = require('./config.js')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let rendererConfig = {
    devtool: '#eval-source-map',
    entry: {
        renderer: path.join(__dirname, 'app/src/renderer/main.js')
    },
    externals: Object.keys(pkg.dependencies || {}),
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            }, {
                test: /\.html$/,
                loader: 'vue-html-loader'
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, 'app/src/renderer')],
                exclude: /node_modules/
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.node$/,
                loader: 'node-loader'
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
                        scss: 'vue-style-loader!css-loader!sass-loader'
                    }
                }
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'imgs/[name].[ext]'
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            }, {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name].[contenthash].css",
            disable: process.env.NODE_ENV === "development"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './app/index.ejs',
            appModules: process.env.NODE_ENV !== 'production'
                ? path.resolve(__dirname, 'app/node_modules')
                : false
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, 'app/dist')
    },
    resolve: {
        alias: {
            'components': path.join(__dirname, 'app/src/renderer/components'),
            'pages': path.join(__dirname, 'app/src/renderer/pages'),
            'renderer': path.join(__dirname, 'app/src/renderer'),
            'database': path.join(__dirname, 'app/src/renderer/database')
        },
        extensions: [
            '.js', '.vue', '.json', '.css', '.node'
        ],
        modules: [
            path.join(__dirname, 'app/node_modules'),
            path.join(__dirname, 'node_modules')
        ]
    },
    target: 'electron-renderer'
}

if (process.env.NODE_ENV !== 'production') {
    /**
   * Apply ESLint
   */
    if (settings.eslint) {
        rendererConfig.module.rules.push({
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            exclude: /node_modules/,
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        })
    }
}

/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
    rendererConfig.devtool = ''

    rendererConfig.plugins.push(new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}), new webpack.LoaderOptionsPlugin({minimize: true}), new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }))
}

module.exports = rendererConfig
