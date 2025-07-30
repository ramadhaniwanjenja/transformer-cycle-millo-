const axios = require('axios');

const API_BASE = 'http://localhost:3005/api';

// Replace these with your actual credentials
const YOUR_EMAIL = 'your-email@example.com'; // Replace with your email
const YOUR_PASSWORD = 'your-password'; // Replace with your password

async function testYourLogin() {
  try {
    console.log('🔐 Testing Your Login Credentials...\n');
    console.log('📧 Email:', YOUR_EMAIL);
    console.log('🔑 Password:', '*'.repeat(YOUR_PASSWORD.length));
    console.log('');

    // Test login with your credentials
    console.log('1️⃣ Attempting login...');
    try {
      const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
        email: YOUR_EMAIL,
        password: YOUR_PASSWORD
      });
      
      console.log('✅ Login successful!');
      console.log('📧 User email:', loginResponse.data.data.user.email);
      console.log('👤 User name:', loginResponse.data.data.user.firstName, loginResponse.data.data.user.lastName);
      console.log('🔑 Access token received:', loginResponse.data.data.accessToken ? 'Yes' : 'No');
      console.log('🔄 Refresh token received:', loginResponse.data.data.refreshToken ? 'Yes' : 'No');
      
      // Test getting user profile with the token
      console.log('\n2️⃣ Testing profile access with token...');
      const profileResponse = await axios.get(`${API_BASE}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${loginResponse.data.data.accessToken}`
        }
      });
      console.log('✅ Profile access successful!');
      console.log('👤 Profile data:', profileResponse.data.data.user.email);
      
    } catch (error) {
      console.log('❌ Login failed!');
      console.log('📊 Status code:', error.response?.status);
      console.log('📋 Error message:', error.response?.data?.message);
      
      if (error.response?.status === 401) {
        console.log('\n💡 Possible solutions:');
        console.log('1. Check if your email is correct');
        console.log('2. Check if your password is correct');
        console.log('3. Make sure you registered with these credentials');
        console.log('4. Try registering again if needed');
      }
    }

  } catch (error) {
    console.error('🚨 Test failed:', error.message);
  }
}

// Instructions for the user
console.log('📝 INSTRUCTIONS:');
console.log('1. Edit this file and replace YOUR_EMAIL and YOUR_PASSWORD with your actual credentials');
console.log('2. Save the file');
console.log('3. Run: node test-your-login.js');
console.log('');

// Run the test
testYourLogin(); 