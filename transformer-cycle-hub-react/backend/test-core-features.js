const axios = require('axios');

// Test all core features
async function testCoreFeatures() {
  console.log('🧪 Testing Core Features...\n');
  
  // First, login to get a token
  let token = '';
  try {
    console.log('1️⃣ Testing Login...');
    const loginResponse = await axios.post('https://transformer-cycle-millo.vercel.app/api/auth/login', {
      email: 'rshafii106@gmail.com',
      password: '123456'
    });
    
    token = loginResponse.data.data.accessToken;
    console.log('✅ Login successful');
    console.log('👤 User:', loginResponse.data.data.user.firstName, loginResponse.data.data.user.lastName);
    console.log('💰 Points:', loginResponse.data.data.user.points);
    console.log('🔑 Token:', token.substring(0, 20) + '...');
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data?.message || error.message);
    return;
  }

  // Test tutorials
  try {
    console.log('\n2️⃣ Testing Tutorials...');
    const tutorialsResponse = await axios.get('https://transformer-cycle-millo.vercel.app/api/tutorials');
    console.log('✅ Tutorials fetched:', tutorialsResponse.data.data.length, 'tutorials');
    
    if (tutorialsResponse.data.data.length > 0) {
      const firstTutorial = tutorialsResponse.data.data[0];
      console.log('📚 First tutorial:', firstTutorial.title);
    }
  } catch (error) {
    console.error('❌ Tutorials failed:', error.response?.data?.message || error.message);
  }

  // Test user's tutorial progress
  try {
    console.log('\n3️⃣ Testing Tutorial Progress...');
    const progressResponse = await axios.get('https://transformer-cycle-millo.vercel.app/api/tutorials/progress', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Tutorial progress fetched:', progressResponse.data.data.length, 'progress records');
  } catch (error) {
    console.error('❌ Tutorial progress failed:', error.response?.data?.message || error.message);
  }

  // Test user's pickups
  try {
    console.log('\n4️⃣ Testing User Pickups...');
    const pickupsResponse = await axios.get('https://transformer-cycle-millo.vercel.app/api/pickups/my-pickups', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ User pickups fetched:', pickupsResponse.data.data.length, 'pickups');
  } catch (error) {
    console.error('❌ User pickups failed:', error.response?.data?.message || error.message);
  }

  // Test user's rewards
  try {
    console.log('\n5️⃣ Testing User Rewards...');
    const rewardsResponse = await axios.get('https://transformer-cycle-millo.vercel.app/api/rewards/my-rewards', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ User rewards fetched');
    console.log('💰 Points balance:', rewardsResponse.data.data.pointsBalance);
    console.log('🎁 Available rewards:', rewardsResponse.data.data.rewards.length);
  } catch (error) {
    console.error('❌ User rewards failed:', error.response?.data?.message || error.message);
  }

  // Test available rewards
  try {
    console.log('\n6️⃣ Testing Available Rewards...');
    const allRewardsResponse = await axios.get('https://transformer-cycle-millo.vercel.app/api/rewards');
    console.log('✅ Available rewards fetched:', allRewardsResponse.data.data.length, 'rewards');
  } catch (error) {
    console.error('❌ Available rewards failed:', error.response?.data?.message || error.message);
  }

  console.log('\n🎯 Core Features Test Complete!');
}

// Run the test
testCoreFeatures(); 