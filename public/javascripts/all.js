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
 * @param {*} json json变量
 */
function getJsonLength(json) {
    var jsonLength = 0;
    for (var i in json) {
        jsonLength++;
    }
    return jsonLength;
}

/**
 * 随机生成人员名单
 * @param {*} 文件数 
 * @param {*} 行数 
 * @param {*} 列数 
 */
function generateRand(file_num, photo_row, photo_col) {
    var photo_num = photo_row * photo_col;
    var nums = [];
    // 构建索引数组
    for (var i = 1; i <= file_num; i++) {
        if (i == 18 || i == 68) {
            continue;
        } else {
            nums.push(i);
        }
    }

    var photos = [],
        links = [],
        ids = [];
    // var links = [];
    // var ids =[];
    for (var i = 0; i < photo_num; i++) {
        // 数组变长（每次有元素剔除）
        var index = Math.floor(Math.random() * nums.length);
        // 添加到输出数组
        photos.push('/images/photo/' + nums[index] + '.jpg');
        links.push('/instructor/' + nums[index]);
        ids.push(nums[index] - 1);
        // 剔除每次已生成随机数的索引位置，保证随机数不重复
        nums.splice(index, 1);
    }
    return {
        'img': photos,
        'link': links,
        'id': ids
    };
}

!(function () {
    'use strict';
    //获取随机人员照片信息
    var users = syncJson('/data');
    var photos = syncJson('/imgs');

    console.log('人员信息:', users.info);
    console.log('随机照片信息:', photos);

    // 文件数
    var file_num = 69;
    // 随机照片数组长度
    var photo_num = parseInt(getJsonLength(photos));
    console.log('photo_num=', photo_num);

    var gallery = $('#gallery');

    var loadedIndex = 1;

    $.each(photos, function (index, photo) {
        var img = document.createElement('img');
        var link = document.createElement('a');
        var li = document.createElement('li');
        var h2_name = document.createElement('h2');
        // 辅导员ID
        var user_id = 0;
        if (photo.length == 20) {
            // 两位数编号
            user_id = parseInt(photo.substring(14, 16)) - 1;
        } else {
            // 单位数编号
            user_id = parseInt(photo.substring(14, 15)) - 1;
        }

        link.href = '/instructor/' + (user_id + 1);
        // link.target = "_blank";
        if (users.info[user_id] !== undefined) {
            h2_name.innerText = users.info[user_id].name;
        } else {
            h2_name.innerText = '姓名';
        }
        link.appendChild(img);
        li.appendChild(link);
        li.appendChild(h2_name);

        gallery[0].appendChild(li);

        img.onload = function (e) {
            img.onload = null;
            setTimeout(function () {
                $(li).addClass('loaded');
            }, 10 * loadedIndex++);
        };
        img.src = photo;
    });

    $('#back').click(function () {
        window.location.href = "/";
    });
})();