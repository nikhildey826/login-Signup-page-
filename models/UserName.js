const mongoose =require('mongoose')

const userNameSchema=new mongoose.Schema({
     username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
     }
},{timestamps:true})

module.exports = mongoose.model('Username', userNameSchema);