/**
 *****************************************
 * Created by lifx
 * Created on 2018-03-31 23:50:18
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    ip = require('@arted/utils/ip'),
    path = require('@arted/utils/path'),
    cwd = path.cwd,
    dir = path.usedir(__dirname);


/**
 *****************************************
 * 定义配置
 *****************************************
 */
module.exports = ({ modules = [], ...settings }) => ({
    root: cwd(),
    app: settings.app || {},
    src: cwd(settings.src || 'src'),
    dist: cwd(settings.dist || 'dist'),
    index: settings.index || dir('./index.html'),
    style: settings.style || 'style.json',
    entry: settings.entry || './index.js',
    filename: settings.filename || 'js/[name].[contenthash:8].js',
    publicPath: settings.publicPath || './',
    staticPath: settings.staticPath || [],
    copy: settings.copy || [],
    open: settings.open,
    modules: [
        ...modules,
        cwd('./node_modules'),
        dir('../node_modules'),
        dir().replace(/node_modules.*?$/, 'node_modules'),
        'node_modules'
    ],
    rules: settings.rules || [],
    plugins: settings.plugins || [],
    alias: {
        '^arted$': 'arted/index.js',
        '^arted': 'arted/lib',
        ...settings.alias
    },
    isProduction: settings.prod,
    framework: settings.framework || 'react',
    externals: settings.externals || {},
    optimization: settings.optimization,
    devServer: {
        hot: true,
        hotOnly: true,
        host: ip(),
        port: settings.port || 10060,
        https: settings.https || false,
        useLocalIp: true,
        publicPath: '/',
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
        watchContentBase: true,
        watchOptions: {
            ignored: /node_modules/
        },
        compress: true,
        inline: true,
        ...settings.devServer
    },
    stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
        entrypoints: false,
        ...settings.stats
    }
});
