const LocalStrategy = require('passport-local').Strategy;
const database = require('../database/testdb')
const bcrypt = require('bcrypt')

module.exports = function(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },async function(username,password,done){
        let user = await database.getEmail(username)
        if(user == undefined){
            console.log("email does not exist")
           done(null,false,{error:'Email Does Not Exist'})
        }
        else{
            try{
                if(await bcrypt.compare(password,user.password)){
                    return done(null,user)
            }
        else{
                console.log('password incorrect')
                return done(null,false,{error:'Password Incorrect'})
            }
            }catch(e){
                done(e)
            }

        }
        
    }))
  
    passport.serializeUser((user,done)=>{
        done(null,user)
    })

    passport.deserializeUser(function (user,done){
        done(null,user)// you can access with req.user
        
    })

    function checkAuthenicated(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        
        res.redirect('/login')
    }

}


   
    
