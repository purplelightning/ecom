var express = require('express')

var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var multer = require('multer')
var session = require('express-session')

var app = express()

global.dbHelper = require('./common/dbHelpers')

//连接数据库，放在首个中间件位置
global.db = mongoose.connect("mongodb://127.0.0.1:27017/test2")

app.use(session({
  secret: 'secret',
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}))


// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));

// 设定view engine变量，意为网页模板引擎
// app.set('view engine', 'ejs');
app.set('view engine', 'html')
app.engine('.html', require('ejs').__express)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(multer())

// 设定静态文件目录，比如本地文件   这里已经把静态文件的根目录设置了，所以直接导入！！！！！！！
app.use(express.static(path.join(__dirname, 'public')))

/*
  中间件传递消息
*/
app.use(function (req, res, next) {
  res.locals.user = req.session.user  //保存用户信息
  var err = req.session.error     //保存结果响应信息
  res.locals.message = ''   //保存html标签
  if (err) res.locals.message = '<div class="alert alert-danger" ' +  //设置message给模板
    'style="margin-bottom: 20px;color:red;">' + err + '</div>'
  next()
})

//首页重定向到注册
app.route('/').get(function (req, res) {
  res.render('register')
})

// app.route('/book').get(function (req, res) {
//   res.send('Get a book')
// })

//导入路由
require('./routes')(app)


app.listen(3333)