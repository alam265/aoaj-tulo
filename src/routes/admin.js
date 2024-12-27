const express = require('express');
const router = express.Router();
const Issue = require("../models/Issue");
const {logout} = require("../controllers/authincationC")

router.get("/", checkLogin, async (req, res)=>{
    let admin = req.user;
    res.render("adminDashboard", {admin});
})


router.post('/topIssues', async (req, res) => {
  try {
    const topIssues = await Issue.aggregate([
      {
        $addFields: {
          upvoteCount: { $size: '$upVotes' } 
        }
      },
      {
        $sort: { upvoteCount: -1 }
      },
      {
        $limit: 10 
      }
    ]);

    res.json(topIssues); 
  } catch (error) {
    console.error('Error fetching top issues:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;


router.get("/logout", logout);