const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/feedbackdb')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/feedback', feedbackRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Feedback API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});