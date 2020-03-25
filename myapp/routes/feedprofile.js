var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('feedprofile', { title: 'feed', userName: req.session.NAME, introDuce: req.session.INTRODUCE, path: req.session.PATH,  email:req.session.EMAIL, idx:req.session.IDX });
  });



module.exports = router;