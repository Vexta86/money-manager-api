// create an schema for the database

const mongoose = require('mongoose');

const incomeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'They must have paid you something!'],
        min: [0, 'They must have paid you something!']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Income', incomeSchema);