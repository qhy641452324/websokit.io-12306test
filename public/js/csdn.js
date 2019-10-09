/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./jssrc/csdn.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./jssrc/csdn.ts":
/*!***********************!*\
  !*** ./jssrc/csdn.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-08 15:41:39
 * @LastEditTime: 2019-10-09 14:03:14
 * @LastEditors: Please set LastEditors
 */
(function () {
    var d = document, w = window, p = parseInt, dd = d.documentElement, db = d.body, dc = d.compatMode == 'CSS1Compat', dx = dc ? dd : db, ec = encodeURIComponent;
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
            var content = (d.getElementById("content")).value;
            if (content != '') {
                var obj = {
                    userid: this.userid,
                    username: this.username,
                    content: content
                    // content: 'dangeceshi'
                };
                this.socket.emit('message', obj);
                // this.socket.emit('singlemessage', obj);
                (d.getElementById("content")).value = '';
            }
            return false;
        },
        genUid: function () {
            return new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
        },
        //更新系统消息，本例中在用户加入、退出的时候调用
        updateSysMsg: function (o, action) {
            console.log(o);
            //当前在线用户列表
            var onlineUsers = o.onlineUsers;
            //当前在线人数
            var onlineCount = o.onlineCount;
            //新加入用户的信息
            var user = o.user;
            //更新在线人数
            var userhtml = '';
            var separator = '';
            for (var key in onlineUsers) {
                if (onlineUsers.hasOwnProperty(key)) {
                    // userhtml += separator + onlineUsers[key];
                    // separator = '、';
                    //两个参数：目标id、当前的userName
                    // userhtml += separator + '<span onclick="CHAT.chatsingle('+ key + ',' + this.username +')" >' + onlineUsers[key] +'</span>';
                    userhtml += separator + "<span onclick=\"CHAT.chatsingle('" + key + "','" + this.username + "')\" >" + onlineUsers[key] + "</span>";
                    separator = '、';
                }
            }
            d.getElementById("onlinecount").innerHTML = '当前共有 ' + onlineCount + ' 人在线，在线列表：' + userhtml;
            //添加系统消息
            var html = '';
            html += '<div class="msg-system">';
            html += user.username;
            html += (action == 'login') ? ' 加入了聊天室' : ' 退出了聊天室';
            html += '</div>';
            var section = d.createElement('section');
            section.className = 'system J-mjrlinkWrap J-cutMsg';
            section.innerHTML = html;
            this.msgObj.appendChild(section);
            this.scrollToBottom();
        },
        //和单个人通信
        chatsingle: function (userid, curname) {
            this.socket.emit('singlemessage', { userid: userid, username: curname, msg: '单个消息测试' });
        },
        //第一个界面用户提交用户名
        usernameSubmit: function () {
            var username = (d.getElementById("username")).value;
            if (username != "") {
                (d.getElementById("username")).value = '';
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
            this.socket = io.connect('ws://127.0.0.1:47866/', { path: "/sbkk/csdn" }); //这里是个巨坑
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
                var isme = (obj.userid == CHAT.userid) ? true : false;
                var contentDiv = '<div>' + obj.content + '</div>';
                var usernameDiv = '<span>' + obj.username + '</span>';
                var section = d.createElement('section');
                if (isme) {
                    section.className = 'user';
                    section.innerHTML = contentDiv + usernameDiv;
                }
                else {
                    section.className = 'service';
                    section.innerHTML = usernameDiv + contentDiv;
                }
                CHAT.msgObj.appendChild(section);
                CHAT.scrollToBottom();
            });
            var curname = this.username; //当前用户ming
            this.socket.on('singlemessage', function (obj) {
                if (obj.userid == CHAT.userid) { //判断目标id是否和当前id一致
                    //this.id是当前用户的id;obj.userid是目标id
                    var isme = (obj.username == curname) ? true : false; //判断是否是自己的窗口
                    var contentDiv = '<div>' + obj.msg + '</div>';
                    var usernameDiv = '<span>' + obj.username + '</span>';
                    var section = d.createElement('section');
                    if (isme) {
                        section.className = 'user';
                        section.innerHTML = contentDiv + usernameDiv;
                    }
                    else {
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
    (d.getElementById("username")).onkeydown = function (e) {
        e = e || event;
        if (e.keyCode === 13) {
            CHAT.usernameSubmit();
        }
    };
    //通过“回车”提交信息
    d.getElementById("content").onkeydown = function (e) {
        e = e || event;
        if (e.keyCode === 13) {
            CHAT.submit();
        }
    };
})();


/***/ })

/******/ });
//# sourceMappingURL=csdn.js.map