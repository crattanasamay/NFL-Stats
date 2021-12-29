var express = require('express');
var router = express.Router();



router.get('/',function(req,res,next){
    res.render("../views/home_page.hbs")
});

module.exports = router;
