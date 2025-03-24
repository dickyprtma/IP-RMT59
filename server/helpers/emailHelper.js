const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD
//     }
// });

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

function emailPageTemplate(verificationLink) {
  return `
<html>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="padding: 30px 20px;">
        <h1 style="color: #333; margin-bottom: 25px;">Verify Your Email Address</h1>
        
        <p style="color: #666; margin-bottom: 20px;">
          Thanks for registering! Please confirm your email address by clicking the button below:
        </p>

        <div style="text-align: center; margin: 40px 0;">
          <a href="${verificationLink}" 
             style="background-color: #2563eb; color: white; 
                    padding: 12px 24px; 
                    border-radius: 5px; 
                    text-decoration: none;
                    font-weight: bold;
                    display: inline-block;">
            Verify Email
          </a>
        </div>

        <p style="color: #666; margin-bottom: 20px;">
          If you didn't create an account with us, please ignore this email.
        </p>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 0.9em;">
            This link will expire in 1 hour.<br>
            Need help? Contact our <a href="mailto:dpratamajs@students.hacktiv8.ac.id" style="color: #2563eb;">support team</a>.
          </p>
        </div>
      </div>

      <footer style="text-align: center; padding: 20px; color: #999; font-size: 0.8em;">
        <p>
          © 2025 RMT59 Dicky Pratama. All rights reserved.<br>
          <a href="#" style="color: #666; text-decoration: none;">Privacy Policy</a> | 
          <a href="#" style="color: #666; text-decoration: none;">Terms of Service</a>
        </p>
      </footer>
    </div>
  </body>
</html>
`
}


module.exports = { transporter, emailPageTemplate }