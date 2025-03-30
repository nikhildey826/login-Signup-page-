const nodemailer=require('nodemailer')

const sendMail = (otp,email)=>{

  try {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>OTP Verification</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 50px; }
            .container { background-color: #fff; border-radius: 8px; padding: 20px; max-width: 500px; margin: auto; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            h1 { color: #333; }
            p { color: #555; }
            .otp { font-size: 24px; font-weight: bold; color: #e63946; margin: 20px 0; }
            .footer { font-size: 12px; color: #777; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>OTP Verification</h1>
            <p>Your One-Time Password (OTP) is:</p>
            <div class="otp">${otp}</div>
            <p>Please use this OTP to verify your account. This code is valid for 5 minutes.</p>
            <div class="footer">
                <p>If you didn't request this, please ignore this email.</p>
            </div>
        </div>
    </body>
    </html>
  `;
   
    
    const transport =nodemailer.createTransport({
        service:'GMAIL',
        auth:{
            user: process.env.EMAIL,
            pass:process.env.EMAIL_PASSWORD
        }
       })
 

       const mailOptions ={
            from:process.env.EMAIL,
            to:email,
            subject:'otp-verify',
            html:htmlContent,
       }
    

       transport.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.error('Error in sending email:', error);  
            throw new Error('Failed to send email');
        }else{
            console.log('Email sent:', info.response); 
        }
       })
  } catch (error) {
    console.log('Error in sendMail function:', error.message);
    throw error
  }
}


module.exports=sendMail