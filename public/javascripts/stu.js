/**
 * 同步获取 json
 * @param {*} urlInfo - 请求地址
 */
function syncJson(urlInfo) {
    var result;
    $.ajax({
        type: 'GET',
        url: urlInfo,
        dataType: 'json',
        async: false,
        success: function (data) {
            result = data;
        }
    });
    return result;
}

/**
 * 获取JSON长度
 * @param {*} json - json变量
 */
function getJsonLength(json){
    var jsonLength=0;
    for (var i in json) {
        jsonLength++;
    }
    return jsonLength;
}

/**
 * 获取url中的参数
 * @param {*} name - url参数
 */
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

    var file_num = 10;
    var photo_row = 1;
    var photo_col = 10;
    var photo_num = photo_row * photo_col;
    var gallery = $('#gallery');
    var photos = [];

    for (var i = 1; i <= file_num; i++) {
        photos.push('/images/photo/' + i + '.jpg');
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
        window.location.href = "/";
    });
})();