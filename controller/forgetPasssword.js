const Users=require('../models/Users')
const crypto=require('crypto')
const sendMail=require('../utils/sendMail')
const forgetPassword=async(req,res,next) =>{


    const {email}=req.body

    try {
        
        const formatedEmail=email.toLowerCase()

        const finderUser=await Users.findOne({email:formatedEmail})
        
        if(!finderUser){
            const error=new Error("no user found")
            error.statusCode=400
            throw error
        }

        if (finderUser.otp.otp && new Date().getTime() < finderUser.otp.expiryTime) {
            const error=new Error(
                `Please wait until ${new Date(finderUser.otp.expiryTime).toLocaleString()} before requesting a new OTP.`)

                error.statusCode=400
                throw error
        }


         const otp=Math.floor(Math.random()*90000)+100000
         console.log(otp)

        const token=crypto.randomBytes(32).toString('hex')

        const otpExpiryTime = new Date().getTime() + 5 * 60 * 1000;

         finderUser.otp.otp=otp
         finderUser.otp.sendTime=new Date().getTime()
         finderUser.otp.expiryTime=otpExpiryTime
         finderUser.otp.token=token

        await finderUser.save()
        sendMail(otp,formatedEmail)
        res.status(200).json({message:'otp sent to your email',status:true,token })

    } catch (error) {
        next(error)
    }
}


module.exports=forgetPassword