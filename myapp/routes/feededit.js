var express = require('express');
var router = express.Router();
var request = require('request');

// function getUrlParams() {
//     var params = {};
//     window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
//     return params;
// }

// openparam=getUrlParams();
// // console.log(openparam)
// user_Idx=openparam.IDX;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('feededit', { title: 'feed', userName: req.session.NAME, introDuce: req.session.INTRODUCE, path: req.session.PATH,  email:req.session.EMAIL, idx:req.session.IDX });
});

// router.put('/edit',function(req,res){
//     var url = "http://13.125.149.206/api/feed/"+user_Idx;
//     var data={
//         CONTENT:content
//     }

//     request.put
// })


module.exports = router;