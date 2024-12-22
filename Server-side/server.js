const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./src/Routes/authRoutes');
const app = express();

app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json()); // Use body-parser to parse JSON requests

// Routes
app.use('/api/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
