const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function isValidNID(value) {
  // Check if the NID is either 10 or 13 digits
  if (!/^\d{10}$/.test(value) && !/^\d{13}$/.test(value)) {
    throw new Error('NID must be either 10 or 13 digits');
  }
  return true;
}

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
    match: /^01[3-9]\d{8}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
  },
  date_of_birth: {
    type: Date,
    required: true,
    validate: {
      validator: function(v) {
        return v instanceof Date && !isNaN(v);
      },
      message: 'Invalid date format',
    },
  },
  district: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  nid_number: {
    type: String,
    required: true,
    validate: [isValidNID, 'NID must be either 10 or 13 digits'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
}, {
  timestamps: true, 
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;


