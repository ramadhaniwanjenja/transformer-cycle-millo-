const axios = require('axios');

// Test the login endpoint
async function testLogin() {
  try {
    console.log('Testing login endpoint...');
    
    const response = await axios.post('https://transformer-cycle-millo.vercel.app/api/auth/login', {
      email: 'admin@transformercycle.com',
      password: 'admin123'
    });
    
    console.log('Login successful:', response.data);
  } catch (error) {
    console.error('Login failed:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });
  }
}

// Test the health endpoint
async function testHealth() {
  try {
    console.log('Testing health endpoint...');
    
    const response = await axios.get('https://transformer-cycle-millo.vercel.app/api/health');
    
    console.log('Health check successful:', response.data);
  } catch (error) {
    console.error('Health check failed:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });
  }
}

// Run tests
async function runTests() {
  console.log('=== Backend Connection Tests ===');
  await testHealth();
  console.log('\n=== Login Test ===');
  await testLogin();
}

runTests(); 