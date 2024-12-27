const express = require('express');
const router = express.Router();
const { getAllIssues } = require('../controllers/getAllissues');
const { checkLogin } = require("../middlewares/checkLogin");
const Issues = require("../models/Issue")

router.get('/', checkLogin, getAllIssues);

router.get('/:id/:userID/upvote', async (req, res) => {
  try {
    const issueID = req.params.id;
    const userID = req.params.userID;

   
    const issue = await Issues.findById(issueID);
    if (!issue) {
      return res.status(404).send('Issue not found');
    }

   
    if (issue.upVotes.includes(userID)) {
      
      issue.upVotes = issue.upVotes.filter(user => user.toString() !== userID.toString());
    } else {
      
      issue.upVotes.push(userID);
      
      issue.downVotes = issue.downVotes.filter(user => user.toString() !== userID.toString());
    }

    
    await issue.save();

    res.redirect('/allIssues');
  } catch (error) {
    console.error('Error processing upvote:', error);
    res.status(500).send('Server Error');
  }
});
  

router.get('/:id/:userID/downvote', async (req, res) => {
  try {
    const issueID = req.params.id;
    const userID = req.params.userID;

    
    const issue = await Issues.findById(issueID);
    if (!issue) {
      return res.status(404).send('Issue not found');
    }

   
    if (issue.downVotes.includes(userID)) {
    
      issue.downVotes = issue.downVotes.filter(user => user.toString() !== userID.toString());
    } else {
     
      issue.downVotes.push(userID);


      issue.upVotes = issue.upVotes.filter(user => user.toString() !== userID.toString());
    }


    
    await issue.save();

    res.redirect('/allIssues');
  } catch (error) {
    console.error('Error processing downvote:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;