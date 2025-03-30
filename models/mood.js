const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    moodValue: {
        type: Number,
        required: true,
        min: 1,
        max: 5, 
    },
    date: {
        type: Date,
        default: Date.now,  
    },
});

const Mood = mongoose.model('Mood', moodSchema);
module.exports = Mood;
