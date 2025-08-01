const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config({ path: './config.env' });

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Create regular user
const createUser = async () => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: 'rshafii106@gmail.com' });
    
    if (existingUser) {
      console.log('⚠️  User already exists!');
      console.log('Email: rshafii106@gmail.com');
      console.log('Password: 123456');
      return;
    }

    // Create regular user
    const regularUser = await User.create({
      firstName: 'Regular',
      lastName: 'User',
      email: 'rshafii106@gmail.com',
      phone: '+254700000001',
      password: '123456',
      role: 'user',
      isActive: true,
      points: 0
    });

    console.log('✅ Regular user created successfully!');
    console.log('📧 Email: rshafii106@gmail.com');
    console.log('🔑 Password: 123456');
    console.log('👤 Role: user');
    console.log('\n🚀 You can now login with these credentials!');

  } catch (error) {
    console.error('❌ Error creating user:', error);
  }
};

// Run the script
const run = async () => {
  await connectDB();
  await createUser();
  process.exit(0);
};

run(); 