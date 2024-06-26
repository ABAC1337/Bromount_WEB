const { text } = require('express');
const mongoose = require('mongoose');


// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    refresh_token: {
        type: String
    }
}, {
    timestamps: true,
});


  
  const User = mongoose.model('User', userSchema);
  module.exports = User;
