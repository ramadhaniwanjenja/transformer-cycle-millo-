const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

const testConnection = async () => {
  try {
    console.log('🔍 Testing MongoDB connection...');
    console.log('📡 URI:', process.env.MONGODB_URI);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📦 Host: ${conn.connection.host}`);
    console.log(`🗄️ Database: ${conn.connection.name}`);
    
    // Test creating a simple document
    const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
    await TestModel.create({ name: 'test' });
    console.log('✅ Database write test successful!');
    
    // Clean up
    await TestModel.deleteOne({ name: 'test' });
    console.log('✅ Database cleanup successful!');
    
    await mongoose.connection.close();
    console.log('🔌 Connection closed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Check if your MongoDB Atlas cluster is running');
    console.log('2. Verify your connection string in config.env');
    console.log('3. Make sure your IP is whitelisted in MongoDB Atlas');
    console.log('4. Check if your database username and password are correct');
  }
};

testConnection(); 