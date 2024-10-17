const express =  require("express")
let router =   express.Router() 
const isLoggedin =  require("../middlewares/isLoggedin")

router.get("/" , (req,res) =>{
    let error =  req.flash("error")
    res.render("index" ,{error})
})

router.get("/shop"  , (req ,res) =>{
    res.render("shop")
})

module.exports = router