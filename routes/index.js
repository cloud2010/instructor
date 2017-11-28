var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '上海海事大学学生处“两随机”抽查系统' });
});

module.exports = router;
