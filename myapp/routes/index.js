var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TocToc' });
});

router.get('/join', function(req, res, next) {
  res.render('join', { title: 'JOIN' });
});




//로그인
router.post('/login', (req, res) => {
  var url = "http://13.125.149.206/api/user/login";
  var email = req.body.EMAIL;
  var password = req.body.PASSWORD;
  var data = {
      EMAIL: email,
      PASSWORD: password}
      
  // console.log(data);

  request.post(url, {
      json: data
  }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        // console.log(request.session.user)
        // console.log('session', req.session)
        console.log(response.body)
        
       
        let loginUser= response.body.login
        // console.log(req.session.user)
        
        req.session.IDX = loginUser.IDX;
        req.session.EMAIL = loginUser.EMAIL;
        req.session.NAME = loginUser.NAME;
        req.session.INTRODUCE = loginUser.INTRODUCE;
        req.session.PATH= loginUser.PATH;
        console.log(req.session)
        res.send("true")
      } else {
          res.send("false")
      }
    
  });
});

//회원정보 수정
router.put('/edit',(req,res)=>{
  var url ="http://13.125.149.206/api/user";
  var email= req.session.EMAIL;
  var idx = req.session.IDX;
  var name = req.body.NAME;
  var introduce = req.body.INTRODUCE;
  var password= req.body.PASSWORD;
  var path= req.body.PATH;


  var data ={
    IDX : idx,
    EMAIL: email,
    NAME: name,
    INTRODUCE : introduce,
    PASSWORD: password,
    PATH:path
  }

  request.put(url,{
    json:data
  },(error,response,body)=>{
    if(!error &&response.statusCode===200){
      console.log(response.body)
      req.session.NAME =req.body.NAME;
      req.session.INTRODUCE = req.body.INTRODUCE;
      req.session.PATH = req.body.PATH;
     
      console.log(req.session)
      res.send("true")
    } else{
      res.send("false")
    }
  })

})

router.delete('/deleteEdit',(req,res)=>{
  var url ="http://13.125.149.206/api/user";
  var idx = req.session.IDX;


  var data ={
    IDX : idx,

  }

  request.delete(url,{
    json:data
  },(error,response,body)=>{
    if(!error &&response.statusCode===200){
      

      res.send("true")
    } else{
      res.send("false")
    }
  })

})





router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/')
});




module.exports = router;
