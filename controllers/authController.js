let usermodel = require("../models/user-models");
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
const {generateToken} = require("../utils/generateToken")

module.exports.registerUser =   (req, res) => {
    try {
      let { fullname, email, password } = req.body;
      
     bcrypt.genSalt(10, function (err , salt){
      bcrypt.hash(password, salt ,  async  function (err, hash){
        if(err)  return  res.send(err.message)
        else{
          let user = await usermodel.create({
            fullname,
            email,
            password:hash
          });
         let token = generateToken(user)
         res.cookie("token" ,token)  
         res.send("user created successFully") 
        }
      })
     })
     
    } catch (error) {
      res.send(err.message);    
    }
  }