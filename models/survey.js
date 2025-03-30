const mongoose=require('mongoose')

const surveySchema=mongoose.Schema({
    email:{
        type:String,
        requires:true
    },
    emotionalWellBeing:{
        happiness:Number,
        recovery:Number,
        overwhelm:Number
    },
    stressAndAnxiety: {
        anxiety: Number,
        exhaustion: Number,
        stressHandling: Number,
    },
    socialRelationships: {
        support: Number,
        loneliness: Number,
        connections: Number,
    },
    selfEsteem: {
        confidence: Number,
        comparison: Number,
        selfAcceptance: Number,
    }
},{timestamps:true})

module.exports=mongoose.model('SurveyResponse',surveySchema)