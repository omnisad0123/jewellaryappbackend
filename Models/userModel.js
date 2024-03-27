const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
   
  },
  password: {
    type: String,
    required: true,
    // You may want to add additional validation for password strength
  },
  Address: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;

