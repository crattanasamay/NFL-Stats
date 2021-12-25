const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/test.db');
const bcrypt = require('bcrypt');
// const { resolve } = require('path/posix');

// db.serialize(function() {
//   db.run("CREATE TABLE user (id INTEGER PRIMARY KEY autoincrement, first_name TEXT,last_name TEXT,email TEXT,password TEXT)");

// //   // var stmt = db.prepare("INSERT INTO user VALUES (?,?,?,?,?)");
// //   // stmt.run(null,'ryan','rattanasamay','ratt@gmail.com','123')
  
  
// //   // stmt.finalize()
// var cool = db.each("SELECT * FROM user", function(err, row) {
//       something = row;
//   });
// // // var email = 'ratt@gmail.com'
// // //   db.get("SELECT * FROM user where email=?",[email],function(err,row){
// // //     if(err){
// // //       console.log('email does not exist')
// // //       return false
// // //     }
// // //     else{
// // //       console.log('email does exist')
// // //       return true
// // //     }
// // //   });
// });

async function getEmail(email){
  var db = new sqlite3.Database('./database/test.db');
  
 
  return await new Promise((resolve,reject)=>{
    db.get("SELECT * FROM user where email =?",String(email), (err, row) => {
      if(err){
        reject(err)
      }
      resolve(row)
    })
  })
}

async function insertUser(user){
  var db = new sqlite3.Database('./database/test.db');
  try{
    const hashedPassword = await bcrypt.hash(user.password,10)
    var stmt = db.prepare("INSERT INTO user VALUES (?,?,?,?,?)");
    stmt.run(null,user.fname,user.lname,user.email,hashedPassword)
    stmt.finalize()
      
  }catch{
    error
  }
}

async function getId(id){
  var db = new sqlite3.Database('./database/test.db');
  
 
  return await new Promise((resolve,reject)=>{
    db.get("SELECT * FROM user where id =?",$id, (err, row) => {
      if(err){
        reject(err)
      }
      resolve(row)
    })
  })
}

 async function update(user, id) {
  var db = new sqlite3.Database('./database/test.db');
  var firstName = user.fname;

  return await new Promise((resolve, reject)=> {
    db.run("UPDATE user SET first_name = ? WHERE id = ?", firstName, id, (err) => {
      if (err) {
        reject(err)
      }
      resolve(console.log("Updated user"))
    })

  })

}

async function deleteUser(id) {
  var db = new sqlite3.Database('./database/test.db');

  return await new Promise((resolve, reject)=> {
    db.run("Delete FROM user WHERE id = ?", id, (err) => {
      if (err) {
        reject(err)
      }
      resolve(console.log("Deleted user"))
    })

  })
}
    
  


module.exports = {getEmail,insertUser,getId, update, deleteUser}
