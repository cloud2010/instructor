var express = require('express');
// 读取辅导员信息
var instructor_info = require('../public/instructors.json')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '上海海事大学学生处“两随机一公开”系统' });
});

router.get('/data', function(req, res){
  // 向客户端响应人员信息
  res.send(instructor_info);
});

module.exports = router;
