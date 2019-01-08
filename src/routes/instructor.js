import { Users } from './db'
import { Router } from 'express'
import Chance from 'chance'
// 读取文件操作模块
import fs from 'fs'
import path from 'path'
// 读取辅导员信息
const router = Router()
const chance = new Chance()

/**
 * 随机选取对应人员的相关照片
 * @param {int} id - 人员ID
 * @param {int} fileNum - 选取的文件数
 */
function generateStu (id, fileNum) {
  let stuPath = path.join(__dirname, '../../public/images/', id)
  console.log('学生照片读取目录:', stuPath)
  // 读取全部学生照片
  let stuPhotos = fs.readdirSync(stuPath)
  // 随机挑选指定个数照片
  let randPhotos = chance.pickset(stuPhotos, fileNum)
  console.log(randPhotos)
  // return stuPhotos.slice(0, fileNum)
  return randPhotos
}
/* GET users listing. */
router.get('/:id', function (req, res) {
  // console.log('url参数对象 :', req.params);
  // console.log('get请求参数对象 :', req.query);
  // console.log('post请求参数对象 :', req.body);
  // console.log('q的值为 :', req.params.id);
  Users.findOne({ number: req.params.id }, {})
    .then(result => {
      console.log(`查询辅导员信息成功-${req.path}`)
      // res.json(result)
      // 数据绑定
      res.render('instructor', result)
    })
    .catch(errs => {
      console.log(`查询出错-${errs}`)
      res.render('instructor', {
        name: '无该辅导员信息',
        dept: '学院'
      })
    })
})

router.get('/stu/:id', function (req, res) {
  res.send(generateStu(req.params.id, 10))
})

export default router
