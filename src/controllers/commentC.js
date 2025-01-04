const Comment = require('../models/Comment')


module.exports.commentController = async (req, res) => {
    try {
      const { issueId } = req.params;
      const { comment } = req.body;
  
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      const newComment = await Comment.create({
        issueId,
        username: req.user.username,
        comment
      });
  
      await Issue.findByIdAndUpdate(issueId, { $push: { comments: newComment._id } });
  
      res.status(200).json(newComment); // Return the new comment
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server Error' });
    }
  };


  module.exports.replyController = async (req, res) => {
    try {
      const { commentId } = req.params;
      const { reply } = req.body;
  
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      const newReply = await Reply.create({
        commentId,
        username: req.user.username,
        reply
      });
  
      await Comment.findByIdAndUpdate(commentId, { $push: { replies: newReply } });
  
      res.status(200).json(newReply); // Return the new reply
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server Error' });
    }
  };