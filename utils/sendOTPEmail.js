const nodemailer = require("nodemailer");

// Create transporter ONCE (outside function)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error("Email Error:", err);
    throw err;
  }
};

module.exports = sendEmail;