// //app:express对象
module.exports = function (app) {
  //对get进行处理
  app.get('/register', function (req, res) {
    res.render('register')
  })

  //对post进行处理
  app.post('/register', function (req, res) {
    var User = global.dbHelper.getModel('user'),//获取model
      uname = req.body.uname,
      pwd = req.body.upwd,
      pwd2 = req.body.upwd2
    User.findOne({name: uname}, function (error, doc) {//查询Model
      if (doc) {
        req.session.error = '用户名已存在!'
        res.send(500)
      } else if (pwd!==pwd2) {
        req.session.error='两次密码不一样!'
        res.send(500)
      }
      else {
        User.create({
          name: uname,
          password: req.body.upwd
        }, function (error, doc) {
          if (error) {
            res.send(500)
          } else {
            req.session.error = '用户名创建成功!'
            res.send(200)
          }
        })
      }
    })
  })
}

//express4.0写法不一样
// var express = require('express')
// var router = express.Router()
//
// //对get进行处理
// router.get('/register', function (req, res) {
//   res.render('register')
// })
// router.post('/register', function (req, res) {
//   var User = global.dbHelper.getModel('user'),
//     uname = req.body.uname;
//   User.findOne({name: uname}, function (error, doc) {
//     if (error) {
//       res.send(500);
//       req.session.error = '网络异常错误！';
//       console.log(error);
//     } else if (doc) {
//       req.session.error = '用户名已存在！';
//       res.send(500);
//     } else {
//       User.create({
//         name: uname,
//         password: req.body.upwd
//       }, function (error, doc) {
//         if (error) {
//           res.send(500);
//           console.log(error);
//         } else {
//           req.session.error = '用户名创建成功！';
//           res.send(200);
//         }
//       });
//     }
//   });
// });
//
// module.exports = router