/**
 *****************************************
 * Created by lifx
 * Created on 2018-04-01 11:11:31
 *****************************************
 */
'use strict';


/*
 ****************************************
 * 设置环境变量
 ****************************************
 */
process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    WebpackDevServer = require('webpack-dev-server'),
    webpack = require('../webpack');


/**
 *****************************************
 * 启动打包
 *****************************************
 */
module.exports = settings => {
    let { dist, stats, devServer } = settings,
        { https, host, port, publicPath } = devServer,
        server;


    // 设置服务器配置
    devServer.stats = stats;
    devServer.contentBase = dist;

    // 更新设置
    settings.filename = 'js/[name].bundle.js';
    settings.publicPath = `http${ https ? 's' : '' }://${ host }:${ port }/`;

    // 创建服务器
    server = new WebpackDevServer(webpack(settings), devServer);

    // 启动服务器监听
    server.listen(port, host, err => {

        // 处理错误信息
        if (err) {
            return console.error(err);
        }

        // 打印服务器信息
        console.log(
            '-'.repeat(80),
            `\nProject is running at ${ settings.publicPath }`,
            `\nWebpack output is served from ${ publicPath }`,
            `\nContent for webpack is served from ${ dist }`,
            `\n${ '-'.repeat(80) }`
        );
    });
};