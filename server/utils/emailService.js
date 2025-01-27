// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD
//   }
// });

// export const sendOTP = async (email, otp) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Your OTP for Event Management System',
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <h2>Email Verification</h2>
//         <p>Your OTP for email verification is:</p>
//         <h1 style="color: #4F46E5; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
//         <p>This OTP will expire in 5 minutes.</p>
//         <p>If you didn't request this OTP, please ignore this email.</p>
//       </div>
//     `
//   };

//   await transporter.sendMail(mailOptions);
// };

//not using it