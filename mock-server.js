#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock users database
const users = [
  {
    id: '1',
    fullName: 'Demo User',
    email: 'user@example.com',
    phone: '+1234567890',
    password: 'password123' // In real app, this would be hashed
  }
];

// Mock JWT token (simplified)
const generateToken = (userId) => {
  return `mock-jwt-token-${userId}-${Date.now()}`;
};

// Auth Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt:', { email, password });

  // Find user
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  // Generate token
  const token = generateToken(user.id);

  // Return success response
  res.json({
    success: true,
    message: 'Login successful',
    token: token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone
    }
  });
});

app.post('/api/auth/register', (req, res) => {
  const { fullName, email, phone, password } = req.body;

  console.log('Registration attempt:', { fullName, email, phone });

  // Check if user exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User with this email already exists'
    });
  }

  // Create new user
  const newUser = {
    id: (users.length + 1).toString(),
    fullName,
    email,
    phone,
    password // In real app, hash this
  };

  users.push(newUser);

  // Generate token
  const token = generateToken(newUser.id);

  // Return success response
  res.json({
    success: true,
    message: 'Registration successful',
    token: token,
    user: {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone
    }
  });
});

app.get('/api/auth/verify', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token || !token.startsWith('mock-jwt-token-')) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  // Extract user ID from mock token
  const userId = token.split('-')[3];
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone
    }
  });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Mock server is running',
    timestamp: new Date().toISOString()
  });
});

// Parking spots mock data (basic endpoints)
app.get('/api/parking-spots', (req, res) => {
  res.json({
    success: true,
    spots: [
      {
        id: 'spot-1',
        name: 'Central Mall Parking',
        location: 'Downtown',
        price: 50,
        rating: 4.5,
        availability: 'available'
      }
    ]
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Mock Backend Server Started');
  console.log(`📍 Server running on http://localhost:${PORT}`);
  console.log('📋 Available endpoints:');
  console.log('   POST /api/auth/login');
  console.log('   POST /api/auth/register');
  console.log('   GET  /api/auth/verify');
  console.log('   POST /api/auth/logout');
  console.log('   GET  /api/health');
  console.log('');
  console.log('👤 Demo credentials:');
  console.log('   Email: user@example.com');
  console.log('   Password: password123');
  console.log('');
  console.log('🔧 To stop server: Ctrl+C');
});

module.exports = app;
