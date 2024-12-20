const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const session = require("express-session")
const User = require("./models/User")
const bcrypt = require("bcrypt")

require("dotenv").config()

app.use(express.urlencoded({ extended: false }));
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


app.use("/", authRoute)


  
  

// Testing checLogin 
app.get("/checkLogin",checkLogin ,(req, res)=> {

    console.log(req.User)
    res.send("Access successful")
})











app.listen(5000, (req, res)=> {
    console.log("Listening ON Port 5000")
})
    








