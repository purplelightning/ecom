module.exports = function (app) {
  app.get('/goods', function (req, res) {
    if (req.session.user) {
      req.session.error = ''
      var goods = global.dbHelper.getModel('commodity')
      goods.find({}, function (error, docs) {
        //将commodity变量传入home模板
        res.render('goods', {goods: docs})
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
    var goods = global.dbHelper.getModel('commodity')
    var name = req.body.goodname,
      price = req.body.goodprice,
      imgSrc = req.body.imgSrc
    if (req.body.goodname && req.body.goodprice) {
      goods.create({
        name: name,
        price: price,
        imgSrc: imgSrc
      },function (error,doc) {

      })
      req.session.error = ''
      res.send(200)
    } else {
      req.session.error = '请正确填写商品!'
      res.send(404)
    }
  })
}