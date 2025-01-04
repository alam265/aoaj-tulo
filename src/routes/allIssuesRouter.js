const express = require('express');
const router = express.Router();
const { getAllIssues } = require('../controllers/getAllissues');
const { checkLogin } = require("../middlewares/checkLogin");
const { downvoteController, upvoteController } = require('../controllers/up-downVote');
const { searchController } = require('../controllers/search');
const { commentController, replyController } = require('../controllers/commentC');

router.get('/', checkLogin, getAllIssues);

router.get('/:id/:userID/upvote', upvoteController);
  
router.get('/:id/:userID/downvote', downvoteController);

router.get('/search', searchController);

app.post('/:issueId/addComment', commentController);

app.post('/:commentId/addReply', replyController);




module.exports = router;