"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(port, io) {
    //在线用户
    console.log(port + `//还没有建立链接//`);
    var onlineUsers = {};
    //当前在线人数
    var onlineCount = 0;
    io.on('connection', function (socket) {
        console.log('a user connected');
        // socket.emit('open');//通知客户端已连接
        //监听新用户加入
        socket.on('login', function (obj) {
            //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
            socket.name = obj.userid;
            //检查在线列表，如果不在里面就加入
            if (!onlineUsers.hasOwnProperty(obj.userid)) {
                onlineUsers[obj.userid] = obj.username;
                //在线人数+1
                onlineCount++;
            }
            //向所有客户端广播用户加入
            io.emit('login', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj });
            console.log(obj.username + '加入了聊天室');
        });
        //监听用户退出
        socket.on('disconnect', function () {
            console.log('disconnect;;');
            //将退出的用户从在线列表中删除
            if (onlineUsers.hasOwnProperty(socket.name)) {
                //退出用户的信息
                var obj = { userid: socket.name, username: onlineUsers[socket.name] };
                //删除
                delete onlineUsers[socket.name];
                //在线人数-1
                onlineCount--;
                //向所有客户端广播用户退出
                io.emit('logout', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj });
                console.log(obj.username + '退出了聊天室');
            }
        });
        //监听用户发布聊天内容
        socket.on('message', function (obj) {
            //向所有客户端广播发布的消息
            io.emit('message', obj);
            console.log(obj.username + '：' + obj.content);
        });
        socket.on('singlemessage', function (obj) {
            if (obj) {
                console.log(obj);
                io.emit('singlemessage', obj);
            }
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29raWV0aW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy93ZWJzb2NrZXQvc29raWV0aW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxtQkFBeUIsSUFBSSxFQUFDLEVBQUU7SUFFNUIsTUFBTTtJQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQy9CLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUNyQixRQUFRO0lBQ1IsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBRXBCLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsTUFBTTtRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEMsaUNBQWlDO1FBQ2pDLFNBQVM7UUFDVCxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLEdBQUc7WUFDNUIsbUNBQW1DO1lBQ25DLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUV6QixrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN6QyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7Z0JBQ3ZDLFFBQVE7Z0JBQ1IsV0FBVyxFQUFFLENBQUM7YUFDakI7WUFFRCxjQUFjO1lBQ2QsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDcEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUTtRQUNSLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUE7WUFDM0IsZ0JBQWdCO1lBQ2hCLElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pDLFNBQVM7Z0JBQ1QsSUFBSSxHQUFHLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUV0RSxJQUFJO2dCQUNKLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEMsUUFBUTtnQkFDUixXQUFXLEVBQUUsQ0FBQztnQkFFZCxjQUFjO2dCQUNkLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUNyRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUM7YUFDeEM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFlBQVk7UUFDWixNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLEdBQUc7WUFDOUIsZUFBZTtZQUNmLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUMsVUFBUyxHQUFHO1lBQ2xDLElBQUksR0FBRyxFQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQ2pCLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUE5REQsNEJBOERDIn0=