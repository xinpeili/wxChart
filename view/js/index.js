// 链接socketio服务器
var socket = io('http://localhost:12306');

// 选择头像
$('.touxiang img').on('click', function () {
    $('.active').removeClass('active');
    $(this).addClass('active');
})

// 获取用户名
$('.login').on('click', function () {
    var userName = $('.login-box input').val();
    var imgUrl = $('.active').attr('src');
    if (!userName) {
        $('.error').css('display', 'inline-block');
        return ;
    }
    $('.error').css('display', 'none');
    socket.emit('login', {
        userName: userName,
        imgUrl: imgUrl
    });
    
})
socket.on('loginError', data => {
    alert(data.msg);
})
socket.on('loginSuccess', data => {
    $('.login-box').css('display', 'none');
    $('.chart').css('display', 'block');

    $('#user-count').text(data.user.length - 1);

    // 渲染用户列表
    var userStr = `<ul><li class="me"><img src="${data.data.imgUrl}" /><span>${data.data.userName}</span></li>`;
    for (var i = 0; i < data.user.length; i ++) {
        if (data.user[i].userName != data.data.userName) {
            userStr += `<li><img src="${data.user[i].imgUrl}" /><span>${data.user[i].userName}</span></li>`;
        }
    }
    userStr += '</ul>';
    $('.user-list').html(userStr);

    // 发送消息
    $('.send').on('click', function () {
        var msg = $('.text input').val();
        sendMsg(msg);
    });
    $('.text input').on('keydown', function (e) {
        if (e.keyCode == 13) {
            var msg = $(this).val();
            sendMsg(msg);
        }
    })
    function sendMsg(msg) {
        var content = $('.content');
        var div = document.createElement('div');
        var img = new Image();
        var div1 = document.createElement('div');
        var name = document.createElement('div');
        var contentText = document.createElement('div');

        img.src = data.data.imgUrl;
        name.innerHTML = data.data.userName;
        contentText.innerHTML = msg;
        div.className = 'self';
        div1.className = 'text-box';
        name.className = 'name';
        contentText.className = 'content-text';
        div.appendChild(img);
        div.appendChild(div1);
        div1.appendChild(name);
        div1.appendChild(contentText);
        content.append(div);

        $('.text input').val('');
    }

})

// 广播消息
socket.on('addUser', data => {
    $('.content').append(`
        <div class="system">欢迎${data.userName}加入群聊</div>
    `);
    $('.user-list ul').append(`
        <li><img src="${data.imgUrl}" /><span>${data.userName}</span></li>
    `);
    let count = $('#user-count').text();
    $('#user-count').text(++ count);
})

// socket.on('renderUserList', data => {

// })

