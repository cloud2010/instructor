import { Users } from './db'
import { Router } from 'express'
import Chance from 'chance'
// 读取辅导员编号和权重信息
const iUsers = []
const wUsers = []
const nUsers = []
// 生成随机索引集合
const rIndex = Array.from(new Array(64), (val, index) => index)
Users.find({}, {number: true, weight: true, name: true})
  .sort({number: 1})
  .then((items) => {
    items.forEach((item) => {
      iUsers.push(item.number)
      wUsers.push(item.weight)
      nUsers.push(item.name)
    }
    )
  })
  .catch((err) => {
    console.log(err)
  })
const router = Router()
// 随机数生成库
const chance = new Chance()

/**
 * 随机生成人员名单
 * @param {int} fileNum - 文件数
 * @param {int} photoRow - 行数
 * @param {int} photoCol - 列数
 */
function generateRand (fileNum, photoRow, photoCol) {
  let photoNum = photoRow * photoCol
  // 根据权重生成指定个数的抽样人员
  // let rand = chance.n(chance.weighted, photoNum, iUsers, wUsers)

  let rand = chance.pickset(rIndex, photoNum)
  let photos = []
  let names = []
  let ids = []
  let weights = []
  rand.forEach((item) => {
    photos.push('/images/photo/' + iUsers[item] + '.jpg')
    names.push(nUsers[item])
    ids.push(iUsers[item])
    weights.push(wUsers[item])
  })
  // 幸运儿
  let lucky = chance.weighted(names, weights)
  // console.log(photos)
  // console.log(names)
  console.log(lucky)
  return {imgs: photos, unames: names, nums: ids, one: lucky}
}

/* GET home page. */
router.get('/', function (req, res, next) {
  // console.log(rand)
  // console.log(iUsers)
  // console.log(nUsers)
  console.log('人员个数：', iUsers.length)
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
    .sort({number: 1})
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
  res.json(generateRand(iUsers.length, 1, 10))
})

/* 向客户端响应所有照片信息 */
// router.get('/imgs', function (req, res) {
//   var photos = []
//   for (var i = 1; i <= 69; i++) {
//     // 添加到输出数组
//     if (i === 68 || i === 48) {
//       continue
//     } else {
//       photos.push('/images/photo/' + i + '.jpg')
//     }
//   }
//   res.send(photos)
// })

export default router
