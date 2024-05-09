// create an schema for the database

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
        type: String, 
        required: true,
        // Minimum eight characters, at least one letter, one number and one special character:
        // match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);