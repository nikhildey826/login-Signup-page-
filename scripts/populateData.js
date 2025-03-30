require('dotenv').config()
const mongoose = require('mongoose')
const Exercise = require('../models/Exercise') 
const getConnection=require('../utils/getConnection')
console.log('getConnection loaded successfully')

const seedData = [
    { category: 'emotionalWellBeing', title: 'Morning Meditation', link: 'https://www.youtube.com/watch?v=j734gLbQFbU', type: 'exercise' },
    { category: 'emotionalWellBeing', title: 'Gratitude journaling', link: 'https://www.youtube.com/watch?v=3AlorVZcJgo', type: 'exercise' },
    { category: 'emotionalWellBeing', title: 'Breathing techniques', link: 'https://www.youtube.com/watch?v=tybOi4hjZFQ', type: 'exercise' },
    { category: 'emotionalWellBeing', title: 'Nature walks', link: 'https://www.youtube.com/watch?v=IMMMZ-U4wuo', type: 'exercise' },
    { category: 'emotionalWellBeing', title: 'yoga for emotional healing', link: 'https://www.youtube.com/watch?v=OPVtSmRLCO8', type: 'exercise' },
    { category: 'emotionalWellBeing', title: 'Mindful body scan', link: 'https://www.youtube.com/watch?v=6iDKF-TrAfE', type: 'exercise' },
    { category: 'stressAndAnxiety', title: 'Deep Breathing', link: 'https://www.youtube.com/watch?v=kpSkoXRrZnE', type: 'exercise' },
    { category: 'stressAndAnxiety', title: 'Progressive Muscle relaxation', link: 'https://www.youtube.com/watch?v=D7QoBABZu8k', type: 'exercise' },
    { category: 'stressAndAnxiety', title: 'Visualisation techniques', link: 'https://www.youtube.com/watch?v=E5RTyAqiBJQ', type: 'exercise' },
    { category: 'stressAndAnxiety', title: 'Guided meditation for stress', link: 'https://www.youtube.com/watch?v=tuPW7oOudVc', type: 'exercise' },
    { category: 'stressAndAnxiety', title: 'Progressive relaxation for anxiety', link: 'https://www.youtube.com/watch?v=lPTX-6w4SIQ', type: 'exercise' },
    { category: 'stressAndAnxiety', title: 'mindfullness for anxiety', link: 'https://www.youtube.com/watch?v=wuO6nZhD5bo', type: 'exercise' },
    { category: 'socialRelationships', title: 'Active Listening', link: 'https://www.youtube.com/watch?v=7wUCyjiyXdg', type: 'exercise' },
    { category: 'socialRelationships', title: 'Empathy Practice', link: 'https://www.youtube.com/watch?v=qZu0ukzidkM', type: 'exercise' },
    { category: 'socialRelationships', title: 'Building trust in relationships', link: 'https://www.youtube.com/watch?v=1LoL30SMOok', type: 'exercise' },
    { category: 'socialRelationships', title: 'Conflict Resolution techniques', link: 'https://www.youtube.com/watch?v=v4sby5j4dTY', type: 'exercise' },
    { category: 'socialRelationships', title: 'Assertiveness technique', link: 'https://www.youtube.com/watch?v=hAxCpAnV3-E', type: 'exercise' },
    { category: 'socialRelationships', title: 'Strengthening communication', link: 'https://www.youtube.com/watch?v=X3MG4fEJiF0', type: 'exercise' },
    { category: 'selfEsteem', title: 'Confidence Building', link: 'https://www.youtube.com/watch?v=l_NYrWqUR40&t=48s', type: 'exercise' },
    { category: 'selfEsteem', title: 'Affirmations for self worth', link: 'https://www.youtube.com/watch?v=yo1pJ_D-H3M', type: 'exercise' },
    { category: 'selfEsteem', title: 'Selfcare routine', link: 'https://www.youtube.com/watch?v=OqTyYlGdwkM', type: 'exercise' },
    { category: 'selfEsteem', title: ' Setting Healthy Boundaries', link: 'https://www.youtube.com/watch?v=Gf4FIt5DG4g', type: 'exercise' },
    { category: 'selfEsteem', title: 'Gratitude Practice for Self-Love', link: 'https://www.youtube.com/watch?v=ZsTKyYOuK84', type: 'exercise' },
    { category: 'selfEsteem', title: 'Visualization for Confidence', link: 'https://www.youtube.com/watch?v=ohaTSIjsKr4', type: 'exercise' },
    { category: 'emotionalWellBeing', title: 'Calm Piano Music', link: 'https://www.youtube.com/watch?v=t6chiIXXAxg', type: 'music' },
    { category: 'emotionalWellBeing', title: 'Healing frequencies', link: 'https://www.youtube.com/watch?v=1ZYbU82GVz4', type: 'music' },
    { category: 'emotionalWellBeing', title: 'Gentle rain sound', link: 'https://www.youtube.com/watch?v=HbVYuPogyP0', type: 'music' },
    { category: 'emotionalWellBeing', title: 'Peaceful mind', link: 'https://www.youtube.com/watch?v=BWMcR35D-cE', type: 'music' },
    { category: 'emotionalWellBeing', title: 'Calm your mind', link: 'https://www.youtube.com/watch?v=aIIEI33EUqI', type: 'music' },
    { category: 'emotionalWellBeing', title: 'Sunrise meditation', link: 'https://www.youtube.com/watch?v=H1LIElhBaM8', type: 'music' },
    { category: 'stressAndAnxiety', title: 'Rain Sounds', link: 'https://www.youtube.com/watch?v=HbVYuPogyP0', type: 'music' },
    { category: 'stressAndAnxiety', title: 'Soothing sound', link: 'https://www.youtube.com/watch?v=koRbYQyPU0U', type: 'music' },
    { category: 'stressAndAnxiety', title: 'Deep Relaxation', link: 'https://www.youtube.com/watch?v=KHIbgSN2qAU', type: 'music' },
    { category: 'stressAndAnxiety', title: 'Binaural Beats for Anxiety', link: 'https://www.youtube.com/watch?v=1_G60OdEzXs', type: 'music' },
    { category: 'stressAndAnxiety', title: 'Healing music for stress', link: 'https://www.youtube.com/watch?v=6MYGaUipOR4', type: 'music' },
    { category: 'stressAndAnxiety', title: 'Calm down music', link: 'https://www.youtube.com/watch?v=IQ3SaSf--8Q', type: 'music' },
    { category: 'selfEsteem', title: 'Motivational Beats', link: 'https://www.youtube.com/watch?v=M_EVrdW9GK8', type: 'music' },
    { category: 'selfEsteem', title: 'Happy Tunes', link: 'https://www.youtube.com/watch?v=iBfwWK1yQgo', type: 'music' },
    { category: 'selfEsteem', title: 'Energetic Music', link: 'https://www.youtube.com/watch?v=NACJwvt1dHI', type: 'music' },
    { category: 'selfEsteem', title: 'Rise ans shine', link: 'https://www.youtube.com/watch?v=UtGBU32LUOA', type: 'music' },
    { category: 'selfEsteem', title: 'Confidence booster', link: 'https://www.youtube.com/watch?v=Hfy3WT3MIAk', type: 'music' },
    { category: 'selfEsteem', title: 'Self love', link: 'https://www.youtube.com/watch?v=rXr3zwo5sHo ', type: 'music' },
    { category: 'socialRelationships', title: 'Soft Jazz', link: 'https://example.com/soft-jazz', type: 'music' },
    { category: 'socialRelationships', title: 'Uplifting Acoustic Music', link: 'https://example.com/acoustic-music', type: 'music' },
    { category: 'socialRelationships', title: 'Good Vibes Only', link: 'youtube.com/watch?v=NACJwvt1dHI', type: 'music' },
    { category: 'socialRelationships', title: 'Buddies', link: 'https://www.youtube.com/watch?v=PtKjfiZiYjo', type: 'music' },
    { category: 'socialRelationships', title: 'love and Friendship', link: 'https://www.youtube.com/watch?v=PNcJmhnPVeY', type: 'music' },
    { category: 'socialRelationships', title: 'Happy Life', link: 'https://www.youtube.com/watch?v=aTP_l5ARXcQ', type: 'music' },
    
];


const populateDB = async () => {
    try {
      
        await getConnection();
        console.log('Seeding data into the database...');

      
        await Exercise.deleteMany({});
        console.log('Existing data cleared.');

        
        await Exercise.insertMany(seedData);
        console.log('Database seeded successfully with exercises and music!');

        
        mongoose.connection.close();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Failed to seed data:', error.message);
        mongoose.connection.close(); 
    }
};


populateDB();
