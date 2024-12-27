const mongoose = require('mongoose');
const User = require("../models/User")

const issueSchema = new mongoose.Schema({

  username: {
    type: String, 
    required:true 

  },

  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  description: {
    type: String,
    maxlength: 1000
  },
  imageURL: {
    type: String,
    validate: {
      validator: function (value) {
        // Ensure it's a valid URL if provided
        return !value || /^(http|https):\/\/[^ "]+$/.test(value);
      },
      message: 'Invalid image URL'
    }
  },
  videoURL: {
    type: String,
    validate: {
      validator: function (value) {
        // Ensure it's a valid URL if provided
        return !value || /^(http|https):\/\/[^ "]+$/.test(value);
      },
      message: 'Invalid video URL'
    }
  },
  upVotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  }],
  downVotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  }]
}, 


{
  collection: 'Issue', // Collection name
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Export the Issue model
const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
