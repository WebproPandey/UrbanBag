const express =  require("express")
let router =   express.Router() 
const isLoggedin =  require("../middlewares/isLoggedin")
const  productModel =  require("../models/product-model")  
const userModel =  require("../models/user-models")

router.get("/" , (req,res) =>{
    let error =  req.flash("error")
    res.render("index" ,{error , loggedin:false})
})

router.get("/shop"   ,  async ( req ,res) =>{
   let products =  await productModel.find()

    res.render("shop" ,{products})
})
router.get("/addtocart/:id"  , isLoggedin ,  async ( req ,res) =>{
    let user =  userModel.findOne({ user: req.user.email});
     console.log(user);
     
 })
 

router.get("/logout" , isLoggedin ,  async ( req ,res) =>{ 
     res.render("shop" ,{products})
 })



module.exports = router