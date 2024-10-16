
const  mongoose = require("mongoose")

const ownerschema = mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    product:{
        type:Array,
        default:[]
    },
    gstin:String,
    picture:String,
    
})   

const ownermodel = mongoose.model("owner", ownerschema)

module.exports = ownermodel;