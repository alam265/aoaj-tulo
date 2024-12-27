const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const session = require("express-session")
const User = require("./models/User")
const bcrypt = require("bcrypt")
const path = require('path')
const mongoose = require("mongoose")
require("dotenv").config()

const Issue = require('./models/Issue')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.json())
app.use(express.static('public'));

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

// MongoDB connection 
mongoose.connect('mongodb://127.0.0.1:27017/AoajTulo')
    .then(() => {
        console.log('MongoDB Connected')
    }).catch(() => {
        console.log('OPPS an Error Occured!')
    })


// const {checkLogin} = require("./middlewares/checkLogin")


// Importing Routes 
const authRoute = require("./routes/authenticationR")
const userR = require("./routes/userR")
const adminRouter = require("./routes/admin");
const allIssuesRouter = require("./routes/allIssuesRouter")

app.use('/user', userR)
app.use("/auth/user", authRoute) 
app.use("/admin", adminRouter);
app.use("/allIssues", allIssuesRouter);

app.get("/", (req, res)=> {
   const user = req.session.user
  res.render('Home', {user})
})


// Testing checLogin 
// app.get("/checkLogin",checkLogin ,(req, res)=> {

//     console.log(req.User)
//     res.send("Access successful")
// })

app.listen(5000, (req, res)=> {
    console.log("Listening ON Port 5000")
})
    








