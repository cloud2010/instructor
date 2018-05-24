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
        nums.push(i);
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
    // 切换为同步执行(阻塞后续代码)
    // $.ajaxSettings.async = false;
    // var users = '';
    // 使用getJSON从服务端获取数据
    // $.getJSON('/data', function (data) {
    //     // 辅导员信息
    //     console.log('人员信息:', data.info);
    //     users = data;
    // });
    // 加载完成相关数据后切换为异步非阻塞
    // $.ajaxSettings.async = true;

    //匿名函数ajax同步执行先加载完数据
    var users = syncJson('/data');

    //获取随机人员照片信息及姓名
    var userinfos = syncJson('/rand');

    // console.log('人员信息:', users);
    // console.log('随机照片信息:', photos);

    // 文件数
    var file_num = 64;
    // 随机照片数组长度
    var photo_num = userinfos.imgs.length;
    console.log('photo_num=', photo_num);

    var gallery = $('#gallery');

    var loadedIndex = 1;

    $.each(userinfos.imgs, function (index, item) {
        var img = document.createElement('img');
        var link = document.createElement('a');
        var li = document.createElement('li');
        var h2_name = document.createElement('h2');

        // if (item.length == 20) {
        //     // 两位数编号
        //     user_id = parseInt(item.substring(14, 16));
        // } else {
        //     // 单位数编号
        //     user_id = parseInt(item.substring(14, 15));
        // }

        // 辅导员ID
        var user_id = userinfos.nums[index];
        link.href = '/instructor/' + user_id;
        // link.target = "_blank";
        if (userinfos.unames[index] !== undefined) {
            h2_name.innerText = userinfos.unames[index];
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

        img.src = item;

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



    var timer_big, timer_small;
    // 动画特效
    // var timer_small_slow = setInterval(function () {
    //     $('#gallery li:eq(' + Math.ceil(Math.random() * photo_num) + ')')
    //         .addClass('animated bounce')
    //         .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    //             $(this)
    //                 .removeClass('animated bounce')
    //                 .find('img')
    //                 .attr('src', 'photo/' + Math.ceil(Math.random() * file_num) + '.jpg');

    //         });
    // }, 5000);

    $(document).keypress(function (event) {
        if (event.which == 13 || event.which == 32) {
            $('#action').click();
        }
    });

    $('#action').click(function () {
        // if (timer_small_slow) {
        //     clearInterval(timer_small_slow);
        // }
        if ($(this).data('action') == 'start') {
            $(this).data('action', 'stop').html('停止');
            timer_big = setInterval(function () {
                $('#gallery li.focus').removeClass('focus hover');
                var rand = Math.floor(Math.random() * photo_num);
                $('#gallery li:eq(' + rand + ')').addClass('focus');
            }, 100);
            timer_small = setInterval(function () {
                // 按组随机替换辅导员照片
                var result = generateRand(file_num, 1, photo_num);
                for (var i = 0; i < photo_num; i++) {
                    // 绑定相关数据
                    $('#gallery li:eq(' + i + ') img').attr('src', result.img[i]);
                    $('#gallery li:eq(' + i + ') h2').html(users[result.id[i]].name);
                    $('#gallery li:eq(' + i + ') a').attr('href', result.link[i]);
                }
            }, 1);
        } else {
            $('#gallery li').remove()
            $(this).data('action', 'start').html('开始');

            //获取随机人员照片信息及姓名
            var userinfos = syncJson('/rand');
            var luckytimes = syncJson('/times')
            // console.log(luckytimes.count)
            $('#count').text('抽中人次：' + (luckytimes.count - 1))
            $('#luckys').text('抽中人员：' + luckytimes.names.slice(1).toString())
            console.log(userinfos.weight);
            var loadedIndex = 1;
            $.each(userinfos.imgs, function (index, item) {
                var img = document.createElement('img');
                var link = document.createElement('a');
                var li = document.createElement('li');
                var h2_name = document.createElement('h2');
                var user_id = userinfos.nums[index];
                link.href = '/instructor/' + user_id;
                // link.target = "_blank";
                if (userinfos.unames[index] !== undefined) {
                    h2_name.innerText = userinfos.unames[index];
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
                img.src = item;
            })
            // 幸运儿悬浮显示
            $('#gallery h2:contains(' + userinfos.one + ')').parent().addClass('hover focus');
            clearInterval(timer_big);
            clearInterval(timer_small);
        }
    });

    $('#refresh').click(function () {
        window.location.reload();
    });

    $('#all').click(function () {
        window.location.href = "/all";
    });
})();