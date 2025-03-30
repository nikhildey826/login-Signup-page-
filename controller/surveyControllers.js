const  mongoose=require('mongoose')
const SurveyResponse=require('../models/survey')
const User = require('../models/User'); 

const calculateCategoryScore = (categoryData) => {
    const total = Object.values(categoryData).reduce((sum, score) => sum + score, 0);
    return (total / 3).toFixed(2);
}


const calculateOverallScore=(stats) =>{
    const totalCategoryScore=Object.values(stats).reduce((sum,score)=>sum+parseFloat(score),0)
    return (totalCategoryScore/4).toFixed(2)
}


const submitSurvey =async(req,res)=>{
    try{
        const{ email,emotionalWellBeing, stressAndAnxiety, socialRelationships, selfEsteem}=req.body

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }

        const existingResponse = await SurveyResponse.findOne({ email });
        let response;

        if (existingResponse) {
          
            response = await SurveyResponse.findOneAndUpdate(
                { email }, 
                {
                    emotionalWellBeing,
                    stressAndAnxiety,
                    socialRelationships,
                    selfEsteem
                },
                { new: true } 
            );
        } else {
        
            response = new SurveyResponse({
                email,
                emotionalWellBeing,
                stressAndAnxiety,
                socialRelationships,
                selfEsteem,
            });

        await response.save()
        }
        const stats = {
            emotionalWellBeing: calculateCategoryScore(emotionalWellBeing),
            stressAndAnxiety: calculateCategoryScore(stressAndAnxiety),
            socialRelationships: calculateCategoryScore(socialRelationships),
            selfEsteem: calculateCategoryScore(selfEsteem),
        };
       
        const overallScore=calculateOverallScore(stats)

        res.status(201).json({ 
            message: 'Survey data saved successfully',
            stats: { ...stats, overallScore },
        })
    }catch (error){
        res.status(500).json({ error: 'Failed to submit survey', details: error.message });
     }
}

module.exports=submitSurvey