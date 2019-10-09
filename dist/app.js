"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 16:27:04
 * @LastEditTime: 2019-09-29 16:27:04
 * @LastEditors: your name
 */
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}
require('source-map-support').install();
const koa_1 = __importDefault(require("koa"));
const moment_1 = __importDefault(require("moment"));
const koaejs_1 = __importDefault(require("./modules/koaejs"));
// const render = require('./modules/koaejs')
const koa_body_1 = __importDefault(require("koa-body"));
const reg_route_1 = __importDefault(require("./modules/reg_route"));
const onerror_1 = __importDefault(require("./modules/onerror"));
const sokietio_1 = __importDefault(require("./modules/websocket/sokietio"));
const app = new koa_1.default();
const port = 47866;
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server, { path: "/sbkk/csdn" }); //随便加了个path居然成功了
sokietio_1.default(port, io); //通信测试
//静态文件
app.use(require('koa-static')('public'));
app.use(onerror_1.default());
app.use(koa_body_1.default());
koaejs_1.default(app, {
    root: 'views',
    layout: 'shared/layout',
    viewExt: 'ejs',
    cache: false,
    debug: false
});
app.use(async (ctx, next) => {
    ctx.state.thistime = moment_1.default().format('yyyy-mm-dd HH:MM:ss');
    ctx.state.machine_num = process.env.SERVER_NUM || 0;
    await next();
});
//注册路由
reg_route_1.default(app);
app.use(async (ctx, next) => {
    ctx.status = 404;
    await ctx.render('shared/404', { title: '404', layout: false });
});
server.listen(port, function () {
    console.info(`随便看看(ENV：${process.env.NODE_ENV})已启动，监听端口 ${port}`);
});
// app.listen(port, function () {
//     console.info(`随便看看(ENV：${process.env.NODE_ENV})已启动，监听端口 ${port}`);
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7Ozs7R0FNRztBQUNILElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtJQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUE7Q0FDdkM7QUFFRCxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUV4Qyw4Q0FBcUI7QUFDckIsb0RBQTJCO0FBQzNCLDhEQUFxQztBQUNyQyw2Q0FBNkM7QUFDN0Msd0RBQThCO0FBQzlCLG9FQUEyQztBQUMzQyxnRUFBdUM7QUFDdkMsNEVBQXNEO0FBRXRELE1BQU0sR0FBRyxHQUFHLElBQUksYUFBRyxFQUFFLENBQUE7QUFDckIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFBO0FBRWxCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDM0QsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFBLENBQUUsZ0JBQWdCO0FBRWpGLGtCQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUUsTUFBTTtBQUU5QixNQUFNO0FBQ04sR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtBQUN4QyxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQU8sRUFBRSxDQUFDLENBQUE7QUFFbEIsZ0JBQU0sQ0FBQyxHQUFHLEVBQUU7SUFDUixJQUFJLEVBQUUsT0FBTztJQUNiLE1BQU0sRUFBRSxlQUFlO0lBQ3ZCLE9BQU8sRUFBRSxLQUFLO0lBQ2QsS0FBSyxFQUFFLEtBQUs7SUFDWixLQUFLLEVBQUUsS0FBSztDQUNmLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUN4QixHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxnQkFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUE7SUFDM0QsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFBO0lBQ25ELE1BQU0sSUFBSSxFQUFFLENBQUE7QUFDaEIsQ0FBQyxDQUFDLENBQUE7QUFFRixNQUFNO0FBQ04sbUJBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUVkLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUN4QixHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUNqQixNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtBQUNuRSxDQUFDLENBQUMsQ0FBQTtBQUVGLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO0lBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsYUFBYSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3RFLENBQUMsQ0FBQyxDQUFDO0FBQ0gsaUNBQWlDO0FBQ2pDLHlFQUF5RTtBQUN6RSxNQUFNIn0=