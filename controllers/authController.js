let usermodel = require("../models/user-models");
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
const {generateToken} = require("../utils/generateToken")




module.exports.registerUser =   async (req, res) => {
    try {
      let { fullname, email, password } = req.body;
      let user = await  usermodel.findOne({email: email})
    if(user) 
      {
      req.flash("error" , "you alraedy have an account, please login.")
       return  res.redirect("/")
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      
       user = await usermodel.create({
          fullname,
          email,
          password: hash
      });
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");

    } catch (error) {
      console.log(error.message);
      
      req.flash("error" , "something is wrong"); 
      res.redirect("/")
         
    }
}

module.exports.loginUser = async  (req, res) =>{
 let {email , password} = req.body
 let user = await  usermodel.findOne({email:email})
 if(!user)
  {
    req.flash("error" ,"Email or Password incorrect")
    return res.redirect("/")

  }
 bcrypt.compare(password , user.password , function(err , result){
 if(result){
   let token =  generateToken(user)   
   res.cookie("token" ,token)
   res.redirect("/shop") 
  }
  else{
    req.flash("error" , "Email  or passowrd is Wrong")
    return  res.redirect("/")
 }
})   
}


module.exports.logoutUser =  async (req , res ) =>{
  res.cookie("token" ,"")
  res.redirect("/")
}