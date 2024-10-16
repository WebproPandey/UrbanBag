let  express = require("express")
let app =  express()

const  cookieParser =  require("cookie-parser")
const path =  require("path")
let db  =  require("./config/mongoose-connection")
let IndexRouter =  require("./routes/indexRoute")
let OwnersRouter =  require("./routes/OwnersRoute")
let UsersRouter =  require("./routes/UsersRoute")
let ProductsRouter =  require("./routes/ProductsRoute")
require("dotenv").config()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine" , "ejs")


app.use("/" , IndexRouter)
app.use("/owners" , OwnersRouter)
app.use("/users" , UsersRouter)
app.use("/products" , ProductsRouter)


app.listen(3000 ,  () =>{
    console.log("Server is running on   http://localhost:3000" )
})