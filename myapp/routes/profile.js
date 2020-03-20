var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {




if(!req.session.IDX){
  res.redirect('/');
  return;
}
  res.render('profile', { title: 'profile', userName: req.session.NAME, introDuce: req.session.INTRODUCE, path: req.session.PATH, email:req.session.EMAIL});
 
 


  
  
});



module.exports = router;