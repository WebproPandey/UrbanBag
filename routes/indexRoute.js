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
router.get("/cart", isLoggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");
    
    let bill = 0; 
    if (user.cart.length > 0) {
        bill = Number(user.cart[0].price) - 20 + Number(user.cart[0].discount);
    }
    
    res.render("cart", { user, bill });
});
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
router.post("/removefromcart/:productid", isLoggedin, async (req, res) => {
  try {
      let user = await userModel.findOne({ email: req.user.email });
      user.cart = user.cart.filter(item => item.toString() !== req.params.productid);
      await user.save();
      req.flash("success", "Removed from cart");
      res.redirect("/cart");
  } catch (error) {
      console.log(error.message);
      res.redirect("/cart");
  }
}); 

router.get("/logout" , isLoggedin ,  async ( req ,res) =>{ 
     res.render("shop" ,{products})
 })



module.exports = router
