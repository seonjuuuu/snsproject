var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */

router.get('/', function (req, res, next) {

  // console.log(req.session)

  // res.render('editinfo',{title:"feed", userName: req.session.NAME , introDuce: req.session.INTRODUCE})
  //
  // if (!req.session.IDX){
  //   res.redirect('/')
  // }

  // 세션이 있는지 if문으로 확인
  if (req.session.IDX) {
   
    let url = "http://13.125.149.206/api/user/"+req.session.IDX;
    

    request.get(url,{
      json: true
  }, (error, response, body) => {

      if (!error && response.statusCode === 200) {
        res.render('editinfo', { title: 'feed', userName: req.session.NAME, introDuce: req.session.INTRODUCE, path: req.session.PATH , email:req.session.EMAIL, idx:req.session.IDX  });
      }
    })

    // 세션이 없으면 로그인 화면으로 이동
  } else {
    res.redirect('/')
  }
});




  module.exports = router;