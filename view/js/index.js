// 链接socketio服务器
var socket = io('http://localhost:12306');

// 获取用户名
$('.login').on('click', function () {
    var userName = $('.login-box input').val();
    if (!userName) {
        $('.error').css('display', 'inline-block');
        return ;
    }
    $('.error').css('display', 'none');
    socket.emit('login', {
        userName: userName
    });
    socket.on('loginError', data => {
        alert(data.msg);
    })
    socket.on('loginSuccess', data => {
        console.log(data);
        $('.login-box').css('display', 'none');
        $('.chart').css('display', 'block');
        var userStr = '<ul><li class="me">' + data.data.userName + '<li>';
        for (var i = 0; i < data.user.length; i ++) {
            if (data.user[i] != data.data.userName) {
                userStr += '<li>' + data.user[i] + '</li>'
            }
        }
        userStr += '</ul>';
        $('.user-list').html(userStr);
    })
})