var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {


if (!req.session.IDX) {
  res.redirect('/');
  return;
}

var url = "http://13.125.149.206/api/feed?userIdx=" + req.session.IDX;

request.get(url, {
  json: true
}, (error, response, body) => {

  if (!error && response.statusCode === 200) {

    console.log(body.result.length)



    res.render('profile', {
      title: 'profile',
      userName: req.session.NAME,
      introDuce: req.session.INTRODUCE,
      path: req.session.PATH,
      email: req.session.EMAIL,
      body:response.body

      

    });

  }


})

});







// router.get('/file',function(req,res,next){



//   var url="http://13.125.149.206/api/feed?userIdx="+req.session.IDX;

// request.get(url,{
//   json:true
// },(error,response,body)=>{

//   if( ! error && response.statusCode === 200){

//     console.log(response.body)


//     res.send("true")

//   }
//   else{
//     res.send("false")
//   }

// })

// })













module.exports = router;