// User model goes here

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName : {
    type: String,
    required: true,
    minlength: 5,
    unique: true
  },
  passwordEncypted : {
    type: String
    //minlength: 16,
    //required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;