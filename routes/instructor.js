var express = require('express');
// 读取文件操作模块
var fs = require("fs");
var path = require('path');
// 读取辅导员信息
var instructor_info = require('../public/instructors.json');
var router = express.Router();

/**
 * 随机选取对应人员的相关照片
 * @param {int} id - 人员ID 
 * @param {int} file_num - 选取的文件数
 */
function generateStu(id, file_num) {
  var stuPath = path.join(__dirname, '../public/images', id);
  console.log(stuPath);
  var stuPhotos = fs.readdirSync(stuPath);
  // fs.readdirSync(stuPath, 'utf8', function (err, files) {
  //   if (err) {
  //     return console.error(err);
  //   }
  //   for (var i = 0; i <= file_num; i++) {
  //     stuPhotos.push(files[i]);
  //   }
  // });
  // console.log(stuPhotos);
  return stuPhotos.slice(0, file_num);
}
/* GET users listing. */
router.get('/:id', function (req, res) {
  // console.log('url参数对象 :', req.params);
  // console.log('get请求参数对象 :', req.query);
  // console.log('post请求参数对象 :', req.body);
  // console.log('q的值为 :', req.params.id);
  console.log('选中的辅导员信息：', instructor_info.info[req.params.id - 1]);
  // var i_name = '无该辅导员信息';
  // var i_dept = '';
  // var i_sex = '';
  // var i_university = '';
  // var i_class = '';
  // var i_number = '';
  // var i_phone = '';
  // var i_mobilephone = '';
  // var specialwork = '';
  // var direction = '';
  // if (instructor_info.info[req.params.id - 1] !== undefined) {
  //   i_name = instructor_info.info[req.params.id - 1].name;
  //   i_dept = instructor_info.info[req.params.id - 1].dept;
  // }
  if (instructor_info.info[req.params.id - 1] !== undefined) {
    // 数据绑定
    res.render('instructor', instructor_info.info[req.params.id - 1]);
  } else {
    res.render('instructor', {
      name: '无该辅导员信息',
      dept: '学院'
    });
  }
});

router.get('/stu/:id', function (req, res) {
  res.send(generateStu(req.params.id, 10));
});

module.exports = router;