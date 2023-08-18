'user server'

import { generateVerificationLink } from "./generateVerificationLink ";

import { createTransport } from "nodemailer"


export const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = createTransport({
    host: 'smtp.postmarkapp.com',
    port: 587,
    auth: {
      user: 'YOUR_POSTMARK_SERVER_TOKEN', // Replace with your Postmark server token
      pass: 'YOUR_POSTMARK_SERVER_TOKEN', // Replace with your Postmark server token
    },
  });

  const mailOptions = {
    from: 'your-email@example.com', // Replace with your email address
    to: email,
    subject: 'Email Verification',
    text: `Please click the following link to verify your email: ${generateVerificationLink(token)}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};
