const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['emotionalWellBeing', 'stressAndAnxiety', 'socialRelationships', 'selfEsteem'],
        required: true
    },
    title: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['exercise', 'music'], required: true }
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
