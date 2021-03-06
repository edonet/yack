/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-08 10:15:55
 *****************************************
 */
'use strict';


/**
 *************************************
 * 加载依赖
 *************************************
 */
const
    path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    OutputWebpackPlugin = require('@arted/output-webpack-plugin');


/**
 *************************************
 * 抛出配置
 *************************************
 */
module.exports = settings => ({
    entry: {
        app: ['babel-polyfill', settings.entry]
    },
    mode: 'production',
    performance: {
        maxEntrypointSize: 1048576
    },
    plugins: [
        new webpack.optimize.AggressiveMergingPlugin(),
        new CopyWebpackPlugin(settings.staticPath),
        new CopyWebpackPlugin(settings.copy),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash:8].css',
            chunkFilename: 'css/[name].[chunkhash:8].css'
        }),
        new HtmlWebpackPlugin({
            filename: path.basename(settings.index),
            template: settings.index,
            minify: {
                html5: true,
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new OutputWebpackPlugin({ data: settings.app }),
        ...settings.plugins
    ]
});
