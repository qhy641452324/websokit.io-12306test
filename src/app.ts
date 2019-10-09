
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development'
}

require('source-map-support').install();

import Koa from 'koa'
import moment from 'moment'
import render from './modules/koaejs'
// const render = require('./modules/koaejs')
import koaBody from 'koa-body'
import reg_route from './modules/reg_route'
import onerror from './modules/onerror'
import WebSocketIO from './modules/websocket/sokietio'
import catchweb from './modules/catchweb'
const app = new Koa()
const port = 47866

const server = require('http').createServer(app.callback())
const io = require('socket.io')(server, { path: "/sbkk/csdn" })  //随便加了个path居然成功了

WebSocketIO(port, io);  //通信测试

//静态文件
app.use(require('koa-static')('public'))
app.use(onerror())
app.use(koaBody())

render(app, {
    root: 'views',
    layout: 'shared/layout', //默认模板
    viewExt: 'ejs',
    cache: false,
    debug: false
});

app.use(async (ctx, next) => {
    ctx.state.thistime = moment().format('yyyy-mm-dd HH:MM:ss')
    ctx.state.machine_num = process.env.SERVER_NUM || 0
    await next()
})

//注册路由
reg_route(app)

app.use(async (ctx, next) => {
    ctx.status = 404;
    await ctx.render('shared/404', { title: '404', layout: false })
})

server.listen(port, function () {
    console.info(`随便看看(ENV：${process.env.NODE_ENV})已启动，监听端口 ${port}`);
});
// app.listen(port, function () {
//     console.info(`随便看看(ENV：${process.env.NODE_ENV})已启动，监听端口 ${port}`);
// });
