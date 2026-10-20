const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const emailRoutes = require('./routes/emailRoutes');
require('dotenv').config();
const app = express();
const port = Number(process.env.PORT) || 5000;
app.disable('x-powered-by');
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
  : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:4173'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '12kb' }));
app.use('/send', rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: 'draft-8', legacyHeaders: false, message: { success: false, message: 'Too many messages sent. Please try again in 15 minutes.' } }));
app.use('/', emailRoutes);
app.use((error, req, res, next) => {
  if (error && error.type === 'entity.too.large') return res.status(413).json({ success: false, message: 'Request body is too large.' });
  if (error instanceof SyntaxError && 'body' in error) return res.status(400).json({ success: false, message: 'Request body must be valid JSON.' });
  console.error('Unhandled server error:', error);
  return res.status(500).json({ success: false, message: 'Internal server error.' });
});
if (require.main === module) app.listen(port, () => console.log(`Portfolio API listening on port ${port}`));
module.exports = app;
