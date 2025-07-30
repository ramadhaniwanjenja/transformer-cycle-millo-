const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Tutorial = require('./models/Tutorial');
const UserTutorial = require('./models/UserTutorial');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Debug points system
const debugPoints = async () => {
  try {
    console.log('=== DEBUGGING POINTS SYSTEM ===');
    
    // Check all users and their points
    const users = await User.find({}).select('firstName lastName email points');
    console.log('\n📊 All Users and Points:');
    users.forEach(user => {
      console.log(`${user.firstName} ${user.lastName} (${user.email}): ${user.points || 0} points`);
    });
    
    // Check all tutorials
    const tutorials = await Tutorial.find({}).select('title pointsReward');
    console.log('\n📚 All Tutorials:');
    tutorials.forEach(tutorial => {
      console.log(`${tutorial.title}: ${tutorial.pointsReward} points`);
    });
    
    // Check user tutorial progress
    const userTutorials = await UserTutorial.find({}).populate('user tutorial');
    console.log('\n🎓 User Tutorial Progress:');
    userTutorials.forEach(ut => {
      console.log(`${ut.user.firstName} - ${ut.tutorial.title}: ${ut.isCompleted ? 'COMPLETED' : 'IN PROGRESS'} (${ut.watchProgress}%)`);
    });
    
    // Test adding points to a user
    if (users.length > 0) {
      const testUser = users[0];
      console.log(`\n🧪 Testing points addition for ${testUser.firstName}...`);
      
      const updatedUser = await User.findByIdAndUpdate(
        testUser._id,
        { $inc: { points: 10 } },
        { new: true }
      );
      
      console.log(`✅ Points updated: ${testUser.points || 0} → ${updatedUser.points}`);
    }
    
    console.log('\n=== DEBUG COMPLETE ===');
    process.exit(0);
  } catch (error) {
    console.error('Error debugging points:', error);
    process.exit(1);
  }
};

// Run the debug
connectDB().then(() => {
  debugPoints();
}); 