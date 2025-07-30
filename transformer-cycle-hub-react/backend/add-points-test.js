const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const addPointsToUser = async () => {
  try {
    // Find first user
    const user = await User.findOne({});
    
    if (!user) {
      console.log('No users found in database');
      return;
    }
    
    console.log(`Found user: ${user.firstName} ${user.lastName} (${user.email})`);
    console.log(`Current points: ${user.points || 0}`);
    
    // Add 50 points
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $inc: { points: 50 } },
      { new: true }
    );
    
    console.log(`✅ Points updated: ${user.points || 0} → ${updatedUser.points}`);
    console.log('User can now redeem rewards!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
};

connectDB().then(addPointsToUser); 