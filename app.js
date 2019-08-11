var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// 用户数组
const user = [];

server.listen(12306, () => {
    console.log('聊天室服务已启动');
});

// 处理静态资源
app.use(require('express').static('view'));

app.get('/', function (req, res) {
    res.redirect('/index.html');
})

io.on('connection', function (socket) {
    socket.on('login', data => {
        if (!user.includes(data.userName)) {
            user.push(data.userName);
            socket.emit('loginSuccess', {data, user});
        } else {
            socket.emit('loginError', {msg: '该用户已在聊天室内，请切换账号登陆'});
        }
    })
})