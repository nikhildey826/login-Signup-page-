const User = require('../models/User')
const Exercise = require('../models/Exercise')

const allocateRecommendations = (stats, totalItems) => {
    const weights = {}
    const maxScore = 5
    let totalWeight = 0

    for (const [category, score] of Object.entries(stats)) {
        const weight = maxScore - parseFloat(score)
        weights[category] = weight
        totalWeight += weight
    }

    const allocation = {}
    Object.entries(weights).forEach(([category, weight]) => {
        allocation[category] = Math.round((weight / totalWeight) * totalItems)
    })
   
    return allocation
}

const getRecommendations = async (req, res) => {
    try {
        const { stats } = req.body

        if (!stats) {
            return res.status(400).json({ error: 'Stats are required to generate recommendations' })
        }

      
        const exerciseAllocation = allocateRecommendations(stats, 10)
        const musicAllocation = allocateRecommendations(stats, 10) 

        const exercises = []
        const music = []

       
        for (const [category, count] of Object.entries(exerciseAllocation)) {
            const ex = await Exercise.aggregate([
                { $match: { category, type: 'exercise' } },
                { $sample: { size: count } } 
            ]);
            exercises.push(...ex)
        }

        
        for (const [category, count] of Object.entries(musicAllocation)) {
            const mu = await Exercise.aggregate([
                { $match: { category, type: 'music' } },
                { $sample: { size: count } } 
            ]);
            music.push(...mu)
        }

        
        res.status(200).json({
            message: 'Recommendations generated successfully',
            recommendations: { exercises, music }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate recommendations', details: error.message })
    }
};

module.exports = getRecommendations
