const nodemailer = require('nodemailer');
const emailHtml = require('../templates/emailTemplate.js');
const dotenv = require('dotenv');

dotenv.config();

const sendEmail = async (req, res) => {
  const { email, subject, message } = req.body;

  const filledTemplate = emailHtml
    .replace('{{email}}', email)
    .replace('{{subject}}', subject)
    .replace('{{message}}', message);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: process.env.EMAIL_USER,
    subject: `📬 New Message from Portfolio Contact Form: ${subject}`,
    html: filledTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: '✅ Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: '❌ Failed to send message.' });
  }
};

module.exports = {
  sendEmail
};
