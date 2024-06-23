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
}, {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
});


  
  const User = mongoose.model('User', userSchema);
  module.exports = User;
