var express = require('express')
var router = express.Router();
const database = require('../database/testdb')
const passport = require('passport');
var userId;
const axios = require('axios');
const Chart = require('chart.js');


router.get('/',function(req,res,next){
    var myMap = new Map();
    var obj;
    let user = req.user;
    axios.get("https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/3/roster").then(function(response){
        //"https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams"
        //https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams
        var object = response.data.athletes;
        var players = object[0].items;
        for(i = 0; i < object.length;i++){
            for(j=0; j < object[i].items.length;j++){
                console.log(object[i].items[j].displayName + " : " + object[i].items[j].position.displayName )
                var position = object[i].items[j].position.displayName;
                if (myMap.has(position)) {
                    var counter = myMap.get(position);
                    counter++;
                    myMap.set(position,counter);
                } else {
                    myMap.set(object[i].items[j].position.displayName, 1);
                }
            }
        }
        //console.log(myMap)
        obj = Object.fromEntries(myMap)
        userId = user.id
        console.log(obj)
        res.render('../views/dashboard',{user, obj})
        
  
    }).catch(function(error){
        console.log(error);
    })
    //console.log(user)
    //console.log(user.id)

   

})

router.post('/',async function(req,res,next){
    // console.log(req.body.fname);
    // console.log(req.body.lname)
    // console.log(userId)
    if(req.body.button == 'Edit'){
        await database.update(req.body, userId);
        console.log('edit')
    }
    if(req.body.button == 'Delete'){
        await database.deleteUser(userId);
        console.log('Deleting')
    }



    
    res.redirect('./')
})



module.exports = router