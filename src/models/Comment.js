const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    CommentId: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true
    },
    username: {
      type: String,
      required: true
    },
    reply: {
      type: String,
      required: true,
      maxlength: 500
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  
const commentSchema = new mongoose.Schema({
    issueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Issue',
      required: true
    },
    username: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true,
      maxlength: 1000
    },
    replies: [replySchema]
  }, {
    collection: 'Comment',
    timestamps: true
  });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
  