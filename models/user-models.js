const  mongoose = require("mongoose")

const userschema = mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    orders:{
        type:Array,
        default:[]
    },
    contact:Number,
    picture:String
})

const User = mongoose.model("User", userschema)

module.exports = User;