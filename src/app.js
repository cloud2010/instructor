import express from 'express'
import path from 'path'
// import favicon from 'serve-favicon'
// import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
// var jquery = require('jquery');

import index from './routes/index'
import instructor from './routes/instructor'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/', index)
app.use('/instructor', instructor)

// 禁用 X-Powered-By 头
app.disable('x-powered-by')

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
