module.exports = function (app) {
  app.get('/cart', function (req, res) {
    res.render('cart')
  })
  app.post('/cart', function (req, res) {

  })
}