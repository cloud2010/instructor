var express = require('express');
// 读取辅导员信息
var instructor_info = require('../public/instructors.json')
var router = express.Router();

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

module.exports = router;