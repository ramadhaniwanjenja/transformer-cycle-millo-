const axios = require('axios');

// Test the login endpoint with user credentials
async function testUserLogin() {
  try {
    console.log('Testing user login endpoint...');
    
    const response = await axios.post('https://transformer-cycle-millo.vercel.app/api/auth/login', {
      email: 'rshafii106@gmail.com',
      password: '123456'
    });
    
    console.log('User login successful:', response.data);
  } catch (error) {
    console.error('User login failed:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });
  }
}

// Test admin login as well
async function testAdminLogin() {
  try {
    console.log('Testing admin login endpoint...');
    
    const response = await axios.post('https://transformer-cycle-millo.vercel.app/api/auth/login', {
      email: 'admin@transformercycle.com',
      password: 'admin123'
    });
    
    console.log('Admin login successful:', response.data);
  } catch (error) {
    console.error('Admin login failed:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });
  }
}

// Run tests
async function runTests() {
  console.log('=== User Login Test ===');
  await testUserLogin();
  console.log('\n=== Admin Login Test ===');
  await testAdminLogin();
}

runTests(); 