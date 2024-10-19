const express =  require("express")
let router =   express.Router() 
const isLoggedin =  require("../middlewares/isLoggedin")
const  productModel =  require("../models/product-model")  
const userModel =  require("../models/user-models")

router.get("/" , (req,res) =>{
    let error =  req.flash("error")
    res.render("index" ,{error , loggedin:false})

})

router.get("/shop"  , isLoggedin,  async ( req ,res) =>{
   let products =  await productModel.find()
     let success =  req.flash("success")
    res.render("shop" ,{products , success})
})
router.get("/addtocart/:productid"  , isLoggedin ,  async ( req ,res) =>{
    
   try{
    let user =  await  userModel.findOne({ email: req.user.email});
    user.cart.push(req.params.productid)
    await  user.save()
    req.flash("success" , "Added to cart")
    res.redirect("/shop")

   }
   catch(error){
    console.log(error.message);
    res.redirect("/shop")
    
   }
})
 

router.get("/logout" , isLoggedin ,  async ( req ,res) =>{ 
     res.render("shop" ,{products})
 })



module.exports = router