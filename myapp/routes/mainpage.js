var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {




  
// let url = 'http://13.125.149.206/api/user';

// request.get(url,{json:true},(error,response,body)=>{
//   // console.log('error___', error);
//   // console.log('response___', response);
//   if(!error&&response.statusCode ===200){
//     res.render('mainpage',{
//       userName:req.session.userName
//     })
//   }
// });

// console.log(req.session, 'username')
if(!req.session.IDX){
  res.redirect('/');
  return;
}
  res.render('mainpage', { title: 'main', userName: req.session.NAME, introDuce: req.session.INTRODUCE, path: req.session.PATH, email:req.session.EMAIL  });
 
 
  
});

router.post('/feedwrite',(req,res)=>{
  var url="http://13.125.149.206/api/feed";
  var idx= req.session.IDX;
  var content=req.body.CONTENT;
  var path = req.body.PATH;

  var data={
    USER_IDX : idx,
    CONTENT: content,
    PATH: path
  }

   request.post(url,{
     json:data
   },(error,response,body)=>{
     if(!error&&response.statusCode===200){
       console.log(response.body)
       res.send("true")
     }else{
       res.send("false")
     }
   })

})





router.get('/feed', function(req, res, next) {
    res.render('feed', { title: 'feed', userName: req.session.NAME, introDuce: req.session.INTRODUCE, path: req.session.PATH,  email:req.session.EMAIL});
  });


  router.get('/sns', function(req, res, next) {
    res.render('sns', { title: 'feed', userName: req.session.NAME, introDuce: req.session.INTRODUCE, path: req.session.PATH,  email:req.session.EMAIL });
  });  

  router.get('/service', function(req, res, next) {
    res.render('service', { title: 'profile', userName: req.session.NAME, introDuce: req.session.INTRODUCE, path: req.session.PATH, email:req.session.EMAIL});
  });  


module.exports = router;
