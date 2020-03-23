var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {


if(!req.session.IDX){
  res.redirect('/');
  return;
}

var url="http://13.125.149.206/api/feed?userIdx="+req.session.IDX;

request.get(url,{
  json:true
},(error,response,body)=>{

  if( ! error && response.statusCode === 200){
    console.log("body________", body.result[2].PATH)
    res.render('profile', { 
      title: 'profile', 
      userName: req.session.NAME, 
      introDuce: req.session.INTRODUCE,
      path: req.session.PATH,
      email:req.session.EMAIL,
      // feedpath:body.result,
      // feed: body.result.length
    });
  }

})
  
 
 


  
  
});



module.exports = router;