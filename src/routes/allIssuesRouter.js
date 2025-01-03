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

router.get('/search', async (req, res) => {
  try {
      // Extract the search query from the request
      const searchQuery = req.query.query;

      // Validate if a query is provided
      if (!searchQuery) {
          return res.status(400).json({ error: 'Search query is required' });
      }

      // Use a case-insensitive regular expression to match the query in title or description
      const issues = await Issues.find({
          $or: [
              { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search in the title
              { description: { $regex: searchQuery, $options: 'i' } } // Case-insensitive search in the description
          ]
      });
       const user = req.session.user
      // Return the matching issues
      res.render("searchResult", {issues, user})
  } catch (error) {
      console.error('Error while searching issues:', error);
      res.status(500).json({ error: 'An error occurred while searching' });
  }
});

module.exports = router;