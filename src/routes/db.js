/**
 * 数据库操作模块
 */
import mongoose from 'mongoose'
import dbConfig from '../config/conn.json'
mongoose.connect(dbConfig.db.conn)
mongoose.Promise = Promise

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log(`数据库链接字符串-${dbConfig.db.conn}`)
  console.log('数据库 instructor 连接成功')
})

// 构建表模式
const usersSchema = new mongoose.Schema(
  {
    number: { type: Number },
    name: { type: String },
    dept: { type: String },
    sex: { type: String },
    university: { type: String },
    classes: { type: String },
    id: { type: Number },
    extra: { type: String },
    mobilephone: { type: String },
    specialwork: { type: String },
    direction: { type: String },
    weight: { type: Number }
  },
  { collection: 'users' }
)

/**
 * 导出表模型
 * ref: https://stackoverflow.com/questions/10547118/why-does-mongoose-always-add-an-s-to-the-end-of-my-collection-name/24464025
 */

const Users = mongoose.model('Users', usersSchema)

export { Users }
