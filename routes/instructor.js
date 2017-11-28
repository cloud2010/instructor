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
  res.render('instructor', {
    // 绑定数据到客户端
    name: instructor_info.info[req.params.id - 1].name,
    dept: instructor_info.info[req.params.id - 1].dept
  });
});

router.get('/stu/:id', function (req, res) {
  res.send(generateStu(req.params.id, 10));
});

module.exports = router;