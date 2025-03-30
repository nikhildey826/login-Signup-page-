const User = require('../models/User');
const crypto = require('crypto');
const sendMail = require('../utils/sendMail');
const joi = require('joi');
const { addPendingUser, getPendingUser, removePendingUser } = require('../utils/pendingUsers') 


const OTP_COOLDOWN_TIME =60*1000;
const register = async (req, res, next) => {
  const { error: validationError } = validateUser(req.body);
  const { name, email, password } = req.body;

  
  try {

    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const formattedEmail = email.toLowerCase();

 
    const existingUser = await User.findOne({ email: formattedEmail });
    if (existingUser) {
      const error = new Error('This email already exists');
      error.statusCode = 400;
      throw error;
    }

   const pendingUser=getPendingUser(formattedEmail);

    if (pendingUser) {
      const currentTime=Date.now();
      if(currentTime-pendingUser.sendTime<OTP_COOLDOWN_TIME){

      const error = new Error('OTP already sent. Please verify your email.');
      error.statusCode = 400;
      throw error;
    }
      else{
        removePendingUser(formattedEmail);
      }
    }

  
    const otp = Math.floor(Math.random() * 900000) + 100000;
    console.log(otp)
    const token = crypto.randomBytes(32).toString('hex');
    const otpExpirationTime = Date.now() + 5 * 60 * 1000; 


    addPendingUser(formattedEmail, {
      name,
      password,
      otp,
      token,
      otpExpirationTime,
      sendTime:Date.now(),
    });
      

    console.log(`Sending OTP: ${otp} to ${email}`);

    await sendMail(otp, formattedEmail);

    res.status(200).json({
      message: 'OTP sent to your email. Please verify to complete registration.',
      status: true,
      token,
    });

  } catch (error) {
    next(error);
  }
};


function validateUser(data) {
  const userSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });

  return userSchema.validate(data);
}

module.exports = register;

