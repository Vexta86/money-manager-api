// create an schema for the database

const mongoose = require('mongoose');

const outcomeSchema = mongoose.Schema({
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
        required: [true, 'It must have cost you something!'],
        min: [0, 'It must have cost you something!']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});



module.exports = mongoose.model('Outcome', outcomeSchema);