"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//通信测试
let WebSocket = require('ws');
function default_1(port) {
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
    wss.on('message', function (ws, obj) {
        //向所有客户端广播发布的消息
        ws.emit('message', obj);
        console.log(obj.username + '说：' + obj.content);
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy93ZWJzb2NrZXQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNO0FBQ04sSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLG1CQUF5QixJQUFJO0lBQ3pCLElBQUksR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRS9DLE1BQU07SUFDTixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDckIsUUFBUTtJQUNSLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztJQUVwQixHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxTQUFTLFVBQVUsQ0FBQyxFQUFFO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUMzQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLFFBQVEsQ0FBQyxPQUFPO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxZQUFZO0lBQ1osR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEVBQUMsR0FBRztRQUM5QixlQUFlO1FBQ2YsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBdEJELDRCQXNCQyJ9