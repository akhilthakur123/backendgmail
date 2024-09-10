import express from 'express'; // Use ES module syntax
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import userRoute from './routes/user.route.js';
import emailRoute from './routes/email.route.js';

dotenv.config(); // Load environment variables from .env file

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 8080; // Use environment variable for port

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet()); // Add security-related headers

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Make origin configurable via environment variable
  credentials: true,
};
app.use(cors(corsOptions));

// API routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/email', emailRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message); // Log error message
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
