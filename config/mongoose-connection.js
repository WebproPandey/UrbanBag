const  mongoose =  require("mongoose")
const  config = require("config")
const  dbgr =  require("debug")("development:mongoose")

mongoose.connect(`${config.get("MONGODB_URI")}/UrbanBag`)
.then(() => {
    dbgr("Connected to MongoDB")
})
.catch((err) => {
    dbgr("Failed to connect to MongoDB")
    dbgr(err)
})

module.exports =   mongoose.connection 