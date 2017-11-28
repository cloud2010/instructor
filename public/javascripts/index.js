!(function () {
    'use strict';
    // 辅导员信息
    var users_info = '{"info":[{"number":1,"name":"孙冬","dept":"信息工程学院"},{"number":2,"name":"李吉彬","dept":"信息工程学院"},{"number":3,"name":"周媛","dept":"信息工程学院"},{"number":4,"name":"曹利红","dept":"信息工程学院"},{"number":5,"name":"鲍万松","dept":"信息工程学院"},{"number":6,"name":"李万秀","dept":"信息工程学院"},{"number":7,"name":"刘旻","dept":"信息工程学院"}]}';
    // 解析JSON读取对应ID辅导员的基本信息
    var users = $.parseJSON(users_info);

    var file_num = 7;
    var photo_row = 1;
    var photo_col = 10;
    var photo_num = photo_row * photo_col;
    var gallery = $('#gallery');
    var photos = [];

    for (var i = 1; i <= photo_num; i++) {
        photos.push('/images/photo/' + Math.ceil(Math.random() * file_num) + '.jpg');
    }

    var loadedIndex = 1;

    $.each(photos, function (index, photo) {
        var img = document.createElement('img');
        var link = document.createElement('a');
        var li = document.createElement('li');
        var h2_name = document.createElement('h2');
        var user_id = parseInt(photo.substring(14, 15)) - 1;

        link.href = 'instructor?user=' + photo.substring(14, 15);
        // link.target = "_blank";
        h2_name.innerText = users.info[user_id].name;
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
                var rand = Math.ceil(Math.random() * photo_num);
                $('#gallery li:eq(' + rand + ')').addClass('focus');
            }, 100);
            timer_small = setInterval(function () {
                // 随机辅导员照片
                var rand_file = Math.ceil(Math.random() * file_num);
                // 页面随机位置
                var rand_pos = Math.ceil(Math.random() * photo_num);
                var user_num = parseInt(rand_file) - 1;
                $('#gallery li:eq(' + rand_pos + ') img').attr('src', '/images/photo/' + rand_file + '.jpg');
                $('#gallery li:eq(' + rand_pos + ') a').attr('href', 'instructor?user=' + rand_file);
                $('#gallery li:eq(' + rand_pos + ') h2').text(users.info[user_num].name);
            }, 1);
        } else {
            $(this).data('action', 'start').html('开始');
            $('#gallery li.focus').addClass('hover');
            clearInterval(timer_big);
            clearInterval(timer_small);
        }
    });

    $('#refresh').click(function () {
        window.location.reload();
    })
})();