const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// admin chema
const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3, 
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  nid_number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  age: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;


