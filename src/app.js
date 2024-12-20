const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const session = require("express-session")
const User = require("./models/User")
const bcrypt = require("bcrypt")

require("dotenv").config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET , 
    resave: false,            
    saveUninitialized: true, 
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,        
    }
  })); 

const {checkLogin} = require("./middlewares/checkLogin")


// Importing Routes 
const authRoute = require("./routes/authenticationR")
const adminRoute = require("./routes/admin.route")


app.use("/", adminRoute)


  
  

// Testing checLogin 
app.get("/checkLogin",checkLogin ,(req, res)=> {

    console.log(req.User)
    res.send("Access successful")
})









//404 page
app.use((req,res, next)=> {
  res.status(404).json({
    message : " nai vai page"
  })
})

app.listen(1359, ()=> {
    console.log("server is running at 1359")
})
    








