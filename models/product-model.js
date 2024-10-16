const  mongoose = require("mongoose")
const productschema = mongoose.Schema({
   name:String,
   image:String,
   price:Number,
   discount:{
    type: Number,
    default:0
   },
   bgcolor:String,
   panelcolor:String,
   textcolor:String,
})

const product = mongoose.model("product", productschema)
module.exports = product;