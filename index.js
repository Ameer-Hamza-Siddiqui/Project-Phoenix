const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 5000;
const dbUri =
  process.env.DATABASE_URI || 'mongodb://localhost:27017/phoenix';

// Connect MongoDB
mongoose
  .connect(dbUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB Error:', err));

// Serve Vite build
const uiPath = path.join(__dirname, 'dist');
app.use(express.static(uiPath));

// API
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is alive' });
});

// React/Vite routing
app.get('*', (req, res) => {
  res.sendFile(path.join(uiPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});