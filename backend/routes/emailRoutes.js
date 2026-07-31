const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controllers/emailController');

router.get('/', (req, res) => {
  res.status(200).json({ status: 'online', message: 'Backend is running successfully.' });
});

router.post('/send', sendEmail);

module.exports = router;
