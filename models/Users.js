const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({

    name: {type:String},
    email:{type:String},
    password:{type:String},
    otp:{
        otp:{type:String},
        sendTime:{type:Number},
        expiryTime: { type: Number },
        token:{type:String}
    }
},{timestamps:true});


module.exports=mongoose.model('Users',userSchema)