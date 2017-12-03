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
function getJsonLength(json) {
    var jsonLength = 0;
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
    // 获取对应学生信息
    var i_id = $('#num').text();
    var stu_info = syncJson('/instructor/stu/' + i_id);
    console.log(stu_info);

    var file_num = 10;

    var gallery = $('#gallery');
    var photos = [];

    for (var i in stu_info) {
        photos.push('/images/' + i_id + '/' + stu_info[i]);
    }

    var loadedIndex = 1;

    $.each(photos, function (index, photo) {
        var img = document.createElement('img');
        var link = document.createElement('a');
        var li = document.createElement('li');
        var h4_name = document.createElement('h4');

        // link.href = '#';
        h4_name.innerText = stu_info[index].split('.')[0];
        link.appendChild(img);
        li.appendChild(link);
        li.appendChild(h4_name);

        gallery[0].appendChild(li);

        img.onload = function (e) {
            img.onload = null;
            setTimeout(function () {
                $(li).addClass('loaded');
            }, 10 * loadedIndex++);
        };

        img.src = photo;
        img.alt = stu_info[index];
    });

    // 隐藏学生信息
    $('#gallery h4').hide();

    // 显示学生信息
    $('#show').click(function () {
        if ($('#show').text() == '显示学生信息') {
            $('#gallery h4').show(500);
            $('#show').text('隐藏学生信息');
        } else {
            $('#gallery h4').hide(500);
            $('#show').text('显示学生信息');
        }
    });

    $('#gallery li a').click(function (event) {
        // console.log(event.value);
        console.log($(this).parent().children('h4').fadeIn('slow'));
    });

    $('#back').click(function () {
        window.location.href = "/";
    });

    $('#instructor img').fadeIn('slow');
})();