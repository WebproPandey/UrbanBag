const  mongoose =  require("mongoose")

mongoose.connect("mongodb://localhost:27017/UrbanBag")
.then(() => {
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.log("Failed to connect to MongoDB")
    console.log(err)
})

module.exports =   mongoose.connection 