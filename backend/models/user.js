// user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: false 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
