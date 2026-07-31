const express = require('express');
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', emailRoutes);

app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:5000');
});
