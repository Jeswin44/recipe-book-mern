const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Database connection
connectDB();

// Core Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/recipes', recipeRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'Online',
    message: 'Recipe Book API server is running smoothly.'
  });
});

// Fallback 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server actively running on port ${PORT}`);
});
