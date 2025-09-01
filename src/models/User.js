const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50
  },

  name: {
    type: String,
    maxlength: 100
  },
  email: {
    type: String,
    unique: true,
    maxlength: 100
  },
  password: {
    type: String,
    maxlength: 255
  },
  nid: {
    type: String,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value) || /^\d{13}$/.test(value);
      },
      message: 'NID must be either 10 or 13 digits'
    }
  },
  upvotedIssues: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Issue' // Reference to the Issue model
  }]
}, {
  collection: 'User', // Collection name
  timestamps: false // Disable timestamps
});

// Export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
