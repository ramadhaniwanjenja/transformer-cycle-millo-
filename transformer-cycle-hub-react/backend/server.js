const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Import database connection
const connectDB = require('./utils/database');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const pickupRoutes = require('./routes/pickups');
const contactRoutes = require('./routes/contact');
const activityRoutes = require('./routes/activities');

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://transformer-cycle-millo-x4l9.vercel.app',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/pickups', require('./routes/pickups'));
app.use('/api/tutorials', require('./routes/tutorials'));
app.use('/api/rewards', require('./routes/rewards'));
app.use('/api/recycling-centers', require('./routes/recycling-centers'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/activities', activityRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  res.json({ 
    status: 'OK', 
    message: 'Transformer Cycle Hub API is running',
    timestamp: new Date().toISOString(),
    env: {
      nodeEnv: process.env.NODE_ENV,
      corsOrigin: process.env.CORS_ORIGIN,
      hasMongoUri: !!process.env.MONGODB_URI,
      hasJwtSecret: !!process.env.JWT_SECRET,
      dbConnected: mongoose.connection.readyState === 1
    }
  });
});

// Test auth route
app.post('/api/auth/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Auth test route working',
    method: req.method,
    url: req.url
  });
});

// Test email configuration
app.get('/api/test-email', (req, res) => {
  res.json({
    success: true,
    message: 'Email configuration test',
    config: {
      hasEmailService: !!process.env.EMAIL_SERVICE,
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS,
      hasEmailFrom: !!process.env.EMAIL_FROM,
      hasAdminEmail: !!process.env.ADMIN_EMAIL
    }
  });
});

// Simple login test route (without database)
app.post('/api/auth/login-test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Login test route working',
    data: {
      user: {
        _id: 'test-user-id',
        firstName: 'Test',
        lastName: 'User',
        email: req.body.email,
        role: 'user'
      },
      accessToken: 'test-token',
      refreshToken: 'test-refresh-token'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Start server immediately
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

// Connect to database in background (don't block server startup)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  connectDB().catch(error => {
    console.error('Database connection failed:', error);
  });
}

module.exports = app; 