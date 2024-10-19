const express =require("express")
const  router = express.Router()
const ownerModel = require("../models/owener-model")  
const  isLoggedin = require("../middlewares/isLoggedin")
if(process.env.NODE_ENV === "development"){
   router.post("/create"  , async (req , res) =>{
     let owners = await ownerModel.find()
    if(owners.length > 0) {
        return res
        .status(503)
        .send("you don't havev permission to create a new owner.")
    }
    let {fullname , email , password} =  req.body
    let createOwner =  await ownerModel.create({
        fullname,
        email,
        password,
    })
      res.status(202).send(createOwner)

    }) 

}


router.get("/admin" ,isLoggedin ,(req , res) =>{
   let success =  req.flash("success" ,)
    res.render("createproducts" ,{success})
}) 




module.exports = router