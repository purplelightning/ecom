module.exports = function (app) {

  app.get('/login', function (req, res) {
    res.render('login')
  })

  app.post('/login', function (req, res) {
    var User = global.dbHelper.getModel('user'),
      uname = req.body.loginname
    User.findOne({name: uname}, function (error, doc) {
      //用户不存在
      if (error) {
        res.send(500)
        console.log(error)
      } else if (!doc) {
        req.session.error = '用户名不存在!'
        res.send(404)
      } else {
        if ( req.body.loginwd != doc.password) {//密码错误
          req.session.error = '密码错误'//这里设置的请求错误！！！
          res.send(404)
        } else {//用户名，密码正确
          req.session.user = doc
          res.send(200)
        }
      }
    })
  })
}