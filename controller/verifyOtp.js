const Users = require('../models/Users');
const crypto = require('crypto'); 
const jwt = require('jsonwebtoken');
const verifyOtp = async (req, res, next) => {
  const { email, otp, token } = req.body;

  try {
    const formattedEmail = email.toLowerCase();
    console.log("Formatted Email for searching:", formattedEmail);

    const user = await Users.findOne({ email: formattedEmail });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 400; 
      throw error;
    }

  
    if (!user.otp.otp || user.otp.otp !== otp || user.otp.token !== token) {
      const error = new Error("Invalid OTP or token");
      error.statusCode = 400;
      throw error;
    }

 
    if (new Date().getTime() > user.otp.expiryTime) {
      const error = new Error("OTP has expired. Please request a new one.");
      error.statusCode = 400;
      throw error;
    }

    const resetToken = jwt.sign({ email: formattedEmail }, process.env.JWT_SECRET, { expiresIn: '30m' });

    res.status(200).json({ message: "OTP verified successfully", resetToken, status: true });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    next(error);
  }
};


module.exports = verifyOtp;
