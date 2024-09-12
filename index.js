import express from 'express'; // Use ES module syntax
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import userRoute from './routes/user.route.js';
import emailRoute from './routes/email.route.js';
import homeRoute from './routes/home.route.js'; // Import home route

dotenv.config(); // Load environment variables from .env file

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable for port

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet()); // Add security-related headers

// CORS configuration
app.use(cors({ origin: '*' }));
// const corsOptions = {
//   origin: process.env.CORS_ORIGIN || 'https://frontendgmail.vercel.app', // Make origin configurable via environment variable
//   credentials: true,
// };
// app.use(cors(corsOptions));

// API routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/email', emailRoute);
app.use('/', homeRoute);


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
