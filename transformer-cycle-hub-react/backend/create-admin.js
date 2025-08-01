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

// Create admin user
const createAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@transformercycle.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('Email: admin@transformercycle.com');
      console.log('Password: admin123');
      return;
    }

    // Create admin user
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@transformercycle.com',
      phone: '+254700000000',
      password: 'admin123',
      role: 'admin',
      isActive: true,
      points: 0
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@transformercycle.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Role: admin');
    console.log('\n🚀 You can now login with these credentials!');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
};

// Run the script
const run = async () => {
  await connectDB();
  await createAdmin();
  process.exit(0);
};

run(); 