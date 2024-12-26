const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const session = require("express-session")
const User = require("./models/User")
const bcrypt = require("bcrypt")
const path = require('path')
const mongoose = require("mongoose")
const { CloudinaryStorage } = require('multer-storage-cloudinary');
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


app.use("/auth/user", authRoute) 

app.get("/", (req, res)=> {
   const user = req.session.user
  res.render('Home', {user})
})



  
  

// Testing checLogin 
// app.get("/checkLogin",checkLogin ,(req, res)=> {

//     console.log(req.User)
//     res.send("Access successful")
// })



const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dh64f8e7j',
  api_key: '489883453723141',
  api_secret: 'LTrt118hNI4hPr3lVy7G3Dz1EnA',
});





const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    if (file.mimetype.startsWith('video/')) {
      return {
        folder: 'issue_reports/videos',
        allowed_formats: ['mp4', 'avi', 'mov'],
        resource_type: 'video',
        
      };
    } else if (file.mimetype.startsWith('image/')) {
      return {
        folder: 'issue_reports/images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
        resource_type: 'image',
         
      };
    }
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), (req, res) => {
  if (!req.files || !req.body.issueTitle || !req.body.description) {
    return res.status(400).send('All fields are required.');
  }

  const imageUrl = req.files['image'] ? req.files['image'][0].path : null;
  const videoUrl = req.files['video'] ? req.files['video'][0].path : null;

  // Send back the URLs of the uploaded image and video
  res.json({
    imageUrl,
    videoUrl
  });
});

app.get("/createIssue", (req, res)=> {
  res.render('createIssue')
})

app.post("/createIssue", upload.fields([{ name: "image" }, { name: "video" }]), async(req, res) => {
  // Access text fields
  console.log("Form fields:", req.body.issueTitle); 
  console.log("Form fields:", req.body.description); 
  const issueTitle = req.body.issueTitle 
  const description = req.body.description  


  
  if(req.files.image){var imgPath =  req.files.image[0].path}; 
  if(req.files.video) {var vPath =  req.files.video[0].path}; 


  const newIssue = await Issue.create({
    username: req.session.User.username,
    title: issueTitle,
    description: description,
    imageURL: imgPath,
    videoURL: vPath,
  });

  
res.json({messsage :"Issue created!!", 
  newIssue: newIssue

  })
  
})

app.get('/gotoDb', (req, res)=> {
  const user = req.session.User
  res.render('dashboard', {user})
})



app.get('/userIssues/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Fetch the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }

    
    const issues = await Issue.find({ username });
    console.log(issues)

    // Render the EJS page and pass the issues data
    res.render('issues', { issues, username });
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).send('An error occurred while fetching issues.');
  }
});

app.listen(5000, (req, res)=> {
    console.log("Listening ON Port 5000")
})
    








