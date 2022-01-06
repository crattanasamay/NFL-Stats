const express = require('express')
var router = express.Router()
const database = require('../database/testdb')
const validate = require('../config/validate')

router.get('/',function(req,res,next){
    res.render("../views/create_account.hbs")
})

router.post('/',async function(req,res,next){

  var password = req.body.password

  // if (!validate.validatePassword(password)) {
  //   //console.log("not a good password, try again")
  //   return res.render('./create_account',{error:'Not strong enough password. Provide a lowercase,uppercase, and number!'});
  // }
  let v = await database.getEmail(req.body.email)
  if(v == undefined){
    await database.insertUser(req.body);
    res.redirect('./')
  }
  else{
    return res.render('./create_account',{error:'Email Exists'});

  }
  
   
})

module.exports = router;

