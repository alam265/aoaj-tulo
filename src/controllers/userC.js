//Model import 
const User = require("../models/User")
const Issue = require("../models/Issue")
const {upload} = require("../cloudinary/main")

module.exports.dashboard = (req, res)=> { 
    const user = req.session.User
    res.render('dashboard', {user}); 
} 

module.exports.renderCreateIssue = (req, res)=> {
    res.render('createIssue')
}

module.exports.upload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), (req, res) => {
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
  }

module.exports.createIssue = upload.fields([{ name: "image" }, { name: "video" }]), async(req, res) => {
    

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
    
  }

module.exports.renderAllIssue = async (req, res) => {
    const { username } = req.params;
  
    try {
 
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      
      const issues = await Issue.find({ username });
      
  
      
      res.render('issues', { issues, username });
    } catch (error) {
      console.error('Error fetching issues:', error);
      res.status(500).send('An error occurred while fetching issues.');
    }
  }