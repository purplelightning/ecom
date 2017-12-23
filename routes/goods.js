module.exports = function (app) {
  app.get('/goods', function (req, res) {
    if (req.session.user) {
      var commodity = global.dbHelper.getModel('commodity')
      commodity.find({}, function (error, docs) {
        //将commodity变量传入home模板
        res.render('goods', {commodity: docs})
      })
    } else {
      req.session.error = '请先登录'
      res.redirect('/login')
    }
  })

  app.get('/addgoods', function (req, res) {
    res.render('addgoods')
  })
  app.post('/addgoods', function (req, res) {
    var commodity = global.dbHelper.getModel('commodity')
    commodity.create({
      name: req.body.name,
      price: req.body.price,
      imgSrc: req.body.imgSrc
    }, function (error, doc) {
      if (doc) {
        res.send(200)
      } else {
        res.send(404)
      }
    })
  })
}