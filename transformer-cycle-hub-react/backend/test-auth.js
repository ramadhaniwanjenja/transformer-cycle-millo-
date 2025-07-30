const axios = require('axios');

const API_BASE = 'http://localhost:3005/api';

// Test user data
const testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  phone: '+1234567890',
  password: 'password123'
};

async function testAuth() {
  try {
    console.log('🧪 Testing Authentication System...\n');

    // Test 1: Register a new user
    console.log('1️⃣ Testing User Registration...');
    try {
      const registerResponse = await axios.post(`${API_BASE}/auth/register`, testUser);
      console.log('✅ Registration successful:', registerResponse.data.message);
    } catch (error) {
      if (error.response?.data?.message?.includes('already exists')) {
        console.log('ℹ️ User already exists, continuing with login test...');
      } else {
        console.log('❌ Registration failed:', error.response?.data?.message || error.message);
        return;
      }
    }

    // Test 2: Login with the user
    console.log('\n2️⃣ Testing User Login...');
    try {
      const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      console.log('✅ Login successful!');
      console.log('📧 User email:', loginResponse.data.data.user.email);
      console.log('🔑 Access token received:', loginResponse.data.data.accessToken ? 'Yes' : 'No');
      console.log('🔄 Refresh token received:', loginResponse.data.data.refreshToken ? 'Yes' : 'No');
    } catch (error) {
      console.log('❌ Login failed:', error.response?.data?.message || error.message);
      console.log('📊 Response status:', error.response?.status);
      console.log('📋 Full error response:', JSON.stringify(error.response?.data, null, 2));
    }

    // Test 3: Test with wrong password
    console.log('\n3️⃣ Testing Login with Wrong Password...');
    try {
      await axios.post(`${API_BASE}/auth/login`, {
        email: testUser.email,
        password: 'wrongpassword'
      });
      console.log('❌ This should have failed!');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Correctly rejected wrong password');
      } else {
        console.log('❌ Unexpected error with wrong password:', error.response?.data?.message);
      }
    }

    // Test 4: Test with non-existent email
    console.log('\n4️⃣ Testing Login with Non-existent Email...');
    try {
      await axios.post(`${API_BASE}/auth/login`, {
        email: 'nonexistent@example.com',
        password: 'password123'
      });
      console.log('❌ This should have failed!');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Correctly rejected non-existent email');
      } else {
        console.log('❌ Unexpected error with non-existent email:', error.response?.data?.message);
      }
    }

  } catch (error) {
    console.error('🚨 Test failed:', error.message);
  }
}

// Run the test
testAuth(); 