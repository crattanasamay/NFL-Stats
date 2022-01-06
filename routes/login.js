var express = require('express');
var router = express.Router();
const passport = require('passport');




router.get('/', function(req, res, next) {

  res.render('./login', { title: 'Express' });
});


router.post('/login',async function(req,res,next){

  passport.authenticate('local',{
    successRedirect: './dashboard',
    failureRedirect: './',
  })(req,res,next);
})

module.exports = router;
