//通信测试
let WebSocket = require('ws');
export default function (port){
    let wss = new WebSocket.Server({ port: port });

    //在线用户
    var onlineUsers = {};
    //当前在线人数
    var onlineCount = 0;

    wss.on('connection', function connection(ws) {
        console.log('server: receive connection.');
        ws.on('message', function incoming(message) {
            console.log('server: received: %s', message);
        });
        ws.send('我是服务端的消息,发送给客户端');
    });

    //监听用户发布聊天内容
    wss.on('message', function (ws,obj) {
        //向所有客户端广播发布的消息
        ws.emit('message', obj);
        console.log(obj.username + '说：' + obj.content);
    });
}