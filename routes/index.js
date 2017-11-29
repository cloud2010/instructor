var express = require('express');
// 读取辅导员信息
var instructor_info = require('../public/instructors.json')
var router = express.Router();

/**
 * 随机生成人员名单
 * @param {int} file_num - 文件数
 * @param {int} photo_row - 行数
 * @param {int} photo_col - 列数
 */
function generateRand(file_num, photo_row, photo_col) {
  var photo_num = photo_row * photo_col;
  var photos = [];
  for (var i = 1; i <= photo_num; i++) {
    photos.push('/images/photo/' + Math.ceil(Math.random() * file_num) + '.jpg');
  }
  return photos;
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: '上海海事大学学生处“两随机一公开”系统'
  });
});

/* 向客户端响应人员信息 */
router.get('/data', function (req, res) {
  res.send(instructor_info);
});

/* 向客户端响应随机编号 */
router.get('/rand', function (req, res) {
  res.send(generateRand(71, 1, 10));
});

module.exports = router;