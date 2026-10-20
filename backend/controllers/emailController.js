const nodemailer = require('nodemailer');
const emailHtml = require('../templates/emailTemplate.js');
const escapeHtml = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const sendEmail = async (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.length > 254 || !emailPattern.test(email)) return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  if (!subject || subject.length > 120) return res.status(400).json({ success: false, message: 'Subject is required and must be 120 characters or fewer.' });
  if (!message || message.length > 5000) return res.status(400).json({ success: false, message: 'Message is required and must be 5000 characters or fewer.' });
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email delivery is not configured: EMAIL_USER/EMAIL_PASS are missing.');
    return res.status(503).json({ success: false, message: 'Email service is temporarily unavailable.' });
  }
  const safeValues = { email: escapeHtml(email), subject: escapeHtml(subject), message: escapeHtml(message).replace(/\r?\n/g, '<br />') };
  const filledTemplate = emailHtml.replace('{{email}}', () => safeValues.email).replace('{{subject}}', () => safeValues.subject).replace('{{message}}', () => safeValues.message);
  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS } });
  try {
    await transporter.sendMail({ from: process.env.EMAIL_USER, replyTo: email, to: process.env.EMAIL_USER, subject: `New portfolio contact: ${subject.replace(/[\r\n]+/g, ' ').slice(0, 120)}`, text: `From: ${email}\nSubject: ${subject}\n\n${message}`, html: filledTemplate });
    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error sending portfolio contact email:', error.message);
    return res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
};
module.exports = { sendEmail };
