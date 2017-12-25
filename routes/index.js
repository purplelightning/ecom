//导入其他模块，一同导出

module.exports = function (app) {
  require('./register')(app)
  require('./goods')(app)
  require('./login')(app)
  require('./cart')(app)
  require('./logout')(app)
}

// var express=require('express')
// var router=express.Router()
//
// router.get('/', function (req, res) {
//   // res.send('Hello cooldog')
//   res.render('register')
// })
//
// router.exports=router