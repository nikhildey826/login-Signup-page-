const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const login=async(req,res,next)=>{
    


    const {email,password}=req.body

    try {
        const formattedEmail=email.toLowerCase()

        const findedUser=await User.findOne({email:formattedEmail})
        if(!findedUser){
            const error=new Error('no user found')
            error.statusCode=400
            throw error
        }

        const isPasswordMatch=await bcrypt.compare(password,findedUser.password)
        if(!isPasswordMatch){
            const error=new Error("this password does not match")
            error.statusCode=400
            throw error
        }

        const accessToken=jwt.sign(
            {email:formattedEmail
                ,userId:findedUser._id}
            ,process.env.ACCESS_TOKEN_KEY
            ,{expiresIn:'7d'})

            res.status(200).json({
                message:'success',
                status:true,
                token:accessToken})

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message || 'Server error',
          });
      
    }
}

module.exports=login
