//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

function errorHandler(err) {
    console.log(err);
}

!(function () {
    'use strict';

    var users_info = '{"info":[{"number":1,"name":"孙冬","dept":"信息工程学院"},{"number":2,"name":"李吉彬","dept":"信息工程学院"},{"number":3,"name":"周媛","dept":"信息工程学院"},{"number":4,"name":"曹利红","dept":"信息工程学院"},{"number":5,"name":"鲍万松","dept":"信息工程学院"},{"number":6,"name":"李万秀","dept":"信息工程学院"},{"number":7,"name":"刘旻","dept":"信息工程学院"}]}';

    // 获取辅导员对应id
    var user_id = getUrlParam("user");

    // 解析JSON读取对应ID辅导员的基本信息
    var users = $.parseJSON(users_info);
    var user_num = parseInt(user_id) - 1;
    console.log("JSON Data:" + users.info[user_num].name);

    $('title').text(users.info[user_num].dept + " - " + users.info[user_num].name);
    $('#instructor h1').text(users.info[user_num].dept + " - " + users.info[user_num].name);

    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    console.info(navigator.webkitTemporaryStorage);
    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {
        console.info('Welcome to HTML5 Filesystem!');
        fs.root.getDirectory('photo', {
            create: false
        }, function (dirEntry) {
            var dirReader = dirEntry.createReader();
            console.info(dirReader);
            dirReader.readEntries(function (entries) {
                console.info(entries);
            }, errorHandler);
        }, errorHandler);
    }, errorHandler);

    var file_num = 10;
    var photo_row = 1;
    var photo_col = 10;
    var photo_num = photo_row * photo_col;
    var gallery = $('#gallery');
    var photos = [];

    for (var i = 1; i <= file_num; i++) {
        photos.push('photo/' + i + '.jpg');
    }

    var loadedIndex = 1;

    $.each(photos, function (index, photo) {
        var img = document.createElement('img');
        var link = document.createElement('a');
        var li = document.createElement('li');

        link.href = '#';
        link.appendChild(img);
        li.appendChild(link);

        gallery[0].appendChild(li);

        img.onload = function (e) {
            img.onload = null;
            setTimeout(function () {
                $(li).addClass('loaded');
            }, 10 * loadedIndex++);
        };

        img.src = photo;

        /* 此方式会将重复图片连在一起输出
        var img = document.createElement('img');

        img.onload = function(e){
            img.onload = null;
            var link = document.createElement('a');
            var li = document.createElement('li');

            link.href = '#';
            link.appendChild(this);
            li.appendChild(link);

            gallery[0].appendChild(li);

            setTimeout(function(){
                $(li).addClass('loaded');
            }, 25*loadedIndex++);
        };
        img.src = photo;
        */
    });

    $(document).keypress(function (event) {
        if (event.which == 13 || event.which == 32) {
            $('#action').click();
        }
    });

    $('#back').click(function () {
        window.location.href = "index.html";
    });
})();