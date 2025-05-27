require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // App password
  },
});

const sendMail = async (name, email, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "lakshan@vellaglobal.com", // Destination email
    subject: `Contact Form: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
