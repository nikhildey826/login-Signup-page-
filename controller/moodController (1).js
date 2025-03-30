const Mood = require('../models/mood');


const trackMood = async (req, res) => {
    try {
        const { userId, moodValue } = req.body;

        if (!userId || !moodValue) {
            return res.status(400).json({ error: 'User ID and mood value are required' });
        }

        if (moodValue < 1 || moodValue > 5) {
            return res.status(400).json({ error: 'Mood value must be between 1 and 5' });
        }

     
        const newMood = new Mood({
            userId,
            moodValue,
        });

        await newMood.save();

        res.status(201).json({
            message: 'Mood tracked successfully',
            mood: newMood,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to track mood', details: error.message });
    }
};


const getUserMoods = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const moods = await Mood.find({ userId }).sort({ date: -1 });  

        res.status(200).json({
            message: 'Moods retrieved successfully',
            moods,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve moods', details: error.message });
    }
};

module.exports = { trackMood, getUserMoods };
