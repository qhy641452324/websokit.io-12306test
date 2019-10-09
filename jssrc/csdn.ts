

/***
 *                                         ,s555SB00&
 *                                      :9H####00000Xi
 *                                     1000000000000008
 *                                   ,8000000000B0000008
 *                                  :B0000X3hi8Bs;B00000Ah,
 *             ,8i                  r000B:     1S ,M000000#8;
 *            1AB35.i:               X008 .   SGhr ,A00000000S
 *            10h31MX8                18Hhh3i .i3r ,A0000000005
 *            ;0&i,58r5                 rGSS:     :B0000000000A
 *             1#i  . 9i                 hX.  .: .5000000000001
 *              sG1,  ,G53s.              9#Xi;hS5 3B0000000B1
 *               .h8h.,A000MXSs,           #0H1:    3ssSSX01
 *               s ,000000000000Xhi,       r#00X1s9M8    .GA981
 *               ,. rS8H#0000000000#HG51;.  .h31i;90r    .80000BS;i;
 *                .19AXXXAB00000000000000#MHXG893hrX#XGGXM0000000000MS
 *                s00MM000hsX#0000000000000000000000000000000000000000&,
 *              :GB0#3G00Brs ,1GM00000000000000000000000000000000000000B,
 *            .hM000#00#MX 51  r;iSGAM00000000000000000000000000000000008
 *          :3B00000000000&90h :Gs   .;sSXH000000000000000000000000000000:
 *      s&HA#00000000000000M89A;.8S.       ,r3000000000000000000000000000r
 *   ,13B00000000000000000005 5B3 ;.         ;000000000000000000000000000i
 *  5#00#&0000000000000000009  .39:          ;000000000000000000000000000;
 *  9000X:MM000000000000000#;    ;31.         H00000000000000000000000000:
 *   SH#0B9.rM0000000000000B       :.         3000000000000000000000000005
 *     ,:.   900000000000#HB5                 .M0000000000000000000000000B
 *           ,ssirhSM0&1;i19911i,.             s00000000000000000000000000S
 *              ,,,rHAri1h1rh&0#353Sh:          80000000000000000000000000#:
 *            .A3hH0#5S553&00#h   i:i9S          #0000000000000000000000000A.
 *
 *
 *    又看源码，看你..呀！
 */


// let ws = new WebSocket('ws://localhost:47867');
// ws.onopen = function () {
//     console.log('ws onopen');
//     ws.send('from client: hello');
// };
// ws.onmessage = function (e) {
//     console.log('ws onmessage');
//     console.log('from server: ' + e.data);
// };


// import io from 'socket.io-client';


// //建立websocket连接
// const socket = io('http://127.0.0.1:47866');

// //收到server的连接确认
// socket.on('open', (res) => {
//     console.log(res)
// });

interface obj {
    [key: string]: any;
}

declare let io;
declare let CHAT;

(function () {
    let d = document,
        w: obj = window,
        p = parseInt,
        dd = d.documentElement,
        db = d.body,
        dc = d.compatMode == 'CSS1Compat',
        dx = dc ? dd : db,
        ec = encodeURIComponent;

    w.CHAT = {
        msgObj: d.getElementById("message"),
        screenheight: w.innerHeight ? w.innerHeight : dx.clientHeight,
        username: null,
        userid: null,
        socket: null,
        //让浏览器滚动条保持在最低部
        scrollToBottom: function () {
            w.scrollTo(0, this.msgObj.clientHeight);
        },
        //退出，本例只是一个简单的刷新
        logout: function () {
            //this.socket.disconnect();
            location.reload();
        },
        //提交聊天消息内容
        submit: function () {
            let content = (<HTMLInputElement>(d.getElementById("content"))).value;
            if (content != '') {
                let obj = {
                    userid: this.userid,
                    username: this.username,
                    content: content
                    // content: 'dangeceshi'
                };
                this.socket.emit('message', obj);
                // this.socket.emit('singlemessage', obj);

                (<HTMLInputElement>(d.getElementById("content"))).value = '';
            }
            return false;
        },
        genUid: function () {
            return new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
        },
        //更新系统消息，本例中在用户加入、退出的时候调用
        updateSysMsg: function (o:obj, action) {
            console.log(o)
            //当前在线用户列表
            let onlineUsers = o.onlineUsers;
            //当前在线人数
            let onlineCount = o.onlineCount;
            //新加入用户的信息
            let user = o.user;

            //更新在线人数
            let userhtml = '';
            let separator = '';
            for (const key in onlineUsers) {
                if (onlineUsers.hasOwnProperty(key)) {
                    // userhtml += separator + onlineUsers[key];
                    // separator = '、';
                    //两个参数：目标id、当前的userName
                    // userhtml += separator + '<span onclick="CHAT.chatsingle('+ key + ',' + this.username +')" >' + onlineUsers[key] +'</span>';
                    userhtml += separator + `<span onclick="CHAT.chatsingle('` + key + `','` + this.username +`')" >`+ onlineUsers[key] + `</span>`;
                    separator = '、';
                }
            }
            d.getElementById("onlinecount").innerHTML = '当前共有 ' + onlineCount + ' 人在线，在线列表：' + userhtml;

            //添加系统消息
            let html = '';
            html += '<div class="msg-system">';
            html += user.username;
            html += (action == 'login') ? ' 加入了聊天室' : ' 退出了聊天室';
            html += '</div>';
            let section = d.createElement('section');
            section.className = 'system J-mjrlinkWrap J-cutMsg';
            section.innerHTML = html;
            this.msgObj.appendChild(section);
            this.scrollToBottom();
        },
        //和单个人通信
        chatsingle: function (userid, curname){//将要发送消息的用户id，当前的用户name
            this.socket.emit('singlemessage', { userid: userid,username: curname, msg:'单个消息测试' });
        },
        //第一个界面用户提交用户名
        usernameSubmit: function () {
            let username = (<HTMLInputElement>(d.getElementById("username"))).value;
            if (username != "") {
                (<HTMLInputElement>( d.getElementById("username"))).value = '';
                d.getElementById("loginbox").style.display = 'none';
                d.getElementById("chatbox").style.display = 'block';
                this.init(username);
            }
            return false;
        },
        init: function (username) {
			/*
			客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
			实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
			*/
            this.userid = this.genUid();
            this.username = username;

            d.getElementById("showusername").innerHTML = this.username;
            this.scrollToBottom();

            //连接websocket后端服务器
            this.socket = io.connect('ws://127.0.0.1:47866/', { path: "/sbkk/csdn"});  //这里是个巨坑
            
            //告诉服务器端有用户登录
            this.socket.emit('login', { userid: this.userid, username: this.username });

            //监听新用户登录
            this.socket.on('login', function (o) {
                CHAT.updateSysMsg(o, 'login');
            });

            //监听用户退出
            this.socket.on('logout', function (o) {
                CHAT.updateSysMsg(o, 'logout');
            });

            //监听消息发送
            this.socket.on('message', function (obj) {
                let isme = (obj.userid == CHAT.userid) ? true : false;
                let contentDiv = '<div>' + obj.content + '</div>';
                let usernameDiv = '<span>' + obj.username + '</span>';

                let section = d.createElement('section');
                if (isme) {
                    section.className = 'user';
                    section.innerHTML = contentDiv + usernameDiv;
                } else {
                    section.className = 'service';
                    section.innerHTML = usernameDiv + contentDiv;
                }
                CHAT.msgObj.appendChild(section);
                CHAT.scrollToBottom();
            });
            let curname = this.username;//当前用户ming
            this.socket.on('singlemessage', function (obj) {
                if (obj.userid == CHAT.userid){ //判断目标id是否和当前id一致
                    //this.id是当前用户的id;obj.userid是目标id
                    let isme = (obj.username == curname) ? true : false;  //判断是否是自己的窗口
                    let contentDiv = '<div>' + obj.msg + '</div>';
                    let usernameDiv = '<span>' + obj.username + '</span>';

                    let section = d.createElement('section');
                    if (isme) {
                        section.className = 'user';
                        section.innerHTML = contentDiv + usernameDiv;
                    } else {
                        section.className = 'service';
                        section.innerHTML = usernameDiv + contentDiv;
                    }
                    CHAT.msgObj.appendChild(section);
                    CHAT.scrollToBottom();
                }
            });

        }
    };
    //通过“回车”提交用户名
    (d.getElementById("username")).onkeydown = function (e:any) {
        e = e || event;
        if (e.keyCode === 13) {
            CHAT.usernameSubmit();
        }
    };
    //通过“回车”提交信息
    d.getElementById("content").onkeydown = function (e:any) {
        e = e || event;
        if (e.keyCode === 13) {
            CHAT.submit();
        }
    };
})();
