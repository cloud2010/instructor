import { Users } from './db'
import { Router } from 'express'
// 读取辅导员信息

const router = Router()

/**
 * 随机生成人员名单
 * @param {int} fileNum - 文件数
 * @param {int} photoRow - 行数
 * @param {int} photoCol - 列数
 */
function generateRand (fileNum, photoRow, photoCol) {
  let photoNum = photoRow * photoCol
  let nums = []
  // 构建索引数组
  for (let i = 1; i <= fileNum; i++) {
    if (i === 46 || i === 68) {
      continue
    } else {
      nums.push(i)
    }
  }

  let photos = []
  for (let i = 0; i < photoNum; i++) {
    // 数组变长（每次有元素剔除）
    let index = Math.floor(Math.random() * nums.length)
    // 添加到输出数组
    photos.push('/images/photo/' + nums[index] + '.jpg')
    // 剔除每次已生成随机数的索引位置，保证随机数不重复
    nums.splice(index, 1)
  }
  return photos
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: '学工系统“两随机一公开”工作交流大会'
  })
})

/* GET all instructors page. */
router.get('/all', function (req, res, next) {
  res.render('all', {
    title: '所有辅导员信息'
  })
})

/* 向客户端响应人员信息 */
router.get('/data', function (req, res) {
  // res.send(instructorInfo)
  Users.find({}, {})
    .then(result => {
      console.log(`查询全部辅导员信息-${req.path}`)
      res.json(result)
    })
    .catch(errs => {
      console.log(`查询出错-${errs}`)
    })
})

/* 向客户端响应随机编号 */
router.get('/rand', function (req, res) {
  res.send(generateRand(69, 1, 10))
})

/* 向客户端响应所有照片信息 */
router.get('/imgs', function (req, res) {
  var photos = []
  for (var i = 1; i <= 69; i++) {
    // 添加到输出数组
    if (i === 68 || i === 48) {
      continue
    } else {
      photos.push('/images/photo/' + i + '.jpg')
    }
  }
  res.send(photos)
})

export default router
