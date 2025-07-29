# JWT Security Guide

## 🔐 Current JWT Setup

Your application now uses a secure JWT implementation with:

### **Token Types**
- **Access Token**: Short-lived (7 days) for API access
- **Refresh Token**: Long-lived (30 days) for getting new access tokens

### **Security Features**
- **Issuer/Audience**: Tokens are signed with specific issuer and audience
- **Expiration**: Tokens automatically expire
- **Strong Secret**: Uses a strong JWT secret key

## 🛡️ JWT Security Best Practices

### **1. JWT Secret Management**

**Current Setup (Development)**:
```env
JWT_SECRET=transformer_cycle_hub_super_secret_key_2024_change_in_production
```

**For Production**:
```bash
# Generate a strong random secret (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### **2. Environment Variables**

Never commit JWT secrets to git. Use environment variables:

```env
# Development
JWT_SECRET=your_dev_secret_here

# Production (set via environment)
JWT_SECRET=your_production_secret_here
```

### **3. Token Storage**

**Frontend Storage**:
- Access tokens stored in localStorage (for development)
- Refresh tokens stored in httpOnly cookies (for production)

**Backend Storage**:
- Consider implementing token blacklisting for logout
- Store refresh tokens in database for revocation

### **4. Token Validation**

The middleware validates tokens on protected routes:

```javascript
// Example of how tokens are validated
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'transformer-cycle-hub',
      audience: 'transformer-cycle-hub-users'
    });
  } catch (error) {
    throw new Error('Invalid token');
  }
};
```

## 🔧 JWT Configuration Options

### **Token Expiration**

```env
# Access token (short-lived)
JWT_EXPIRE=7d

# Refresh token (long-lived)
JWT_REFRESH_EXPIRE=30d
```

### **Token Payload**

```javascript
// Access token payload
{
  "id": "user_id",
  "iss": "transformer-cycle-hub",
  "aud": "transformer-cycle-hub-users",
  "exp": 1234567890
}

// Refresh token payload
{
  "id": "user_id",
  "type": "refresh",
  "iss": "transformer-cycle-hub",
  "aud": "transformer-cycle-hub-users",
  "exp": 1234567890
}
```

## 🚀 Production Security Checklist

### **Before Deployment**

1. **Generate Strong JWT Secret**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Set Environment Variables**:
   ```env
   JWT_SECRET=your_generated_secret_here
   NODE_ENV=production
   ```

3. **Update CORS Settings**:
   ```env
   CORS_ORIGIN=https://yourdomain.com
   ```

4. **Use HTTPS**: Always use HTTPS in production

5. **Implement Token Blacklisting** (Optional):
   ```javascript
   // Store invalidated tokens in Redis/database
   const blacklistToken = async (token) => {
     await redis.setex(`blacklist:${token}`, 3600, '1');
   };
   ```

### **Security Headers**

Add these headers to your Express app:

```javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
    },
  },
}));
```

## 🔍 JWT Debugging

### **Check Token Validity**

```javascript
// In browser console
const token = localStorage.getItem('accessToken');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log('Token payload:', payload);
console.log('Expires:', new Date(payload.exp * 1000));
```

### **Common JWT Errors**

1. **"Invalid token"**: Token is malformed or expired
2. **"Token expired"**: Token has passed expiration time
3. **"Invalid signature"**: Token was signed with different secret

## 📱 Frontend Token Management

### **Token Storage**

```javascript
// Store tokens
localStorage.setItem('accessToken', accessToken);
localStorage.setItem('refreshToken', refreshToken);

// Get tokens
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

// Remove tokens (logout)
localStorage.removeItem('accessToken');
localStorage.removeItem('refreshToken');
```

### **API Requests with Tokens**

```javascript
// Add token to requests
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  return response;
};
```

## 🔄 Token Refresh Flow

### **Automatic Token Refresh**

```javascript
// Check if token is expired
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

// Refresh token if needed
const refreshTokenIfNeeded = async () => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (isTokenExpired(accessToken)) {
    const refreshToken = localStorage.getItem('refreshToken');
    
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
      }
    } catch (error) {
      // Redirect to login
      localStorage.clear();
      window.location.href = '/login';
    }
  }
};
```

## 🛠️ Testing JWT

### **Test Token Generation**

```bash
# Test JWT utilities
cd backend
node -e "
const { generateAccessToken } = require('./utils/jwt');
const token = generateAccessToken('test_user_id');
console.log('Generated token:', token);
"
```

### **Test Token Validation**

```bash
# Test token verification
cd backend
node -e "
const { generateAccessToken, verifyToken } = require('./utils/jwt');
const token = generateAccessToken('test_user_id');
const decoded = verifyToken(token);
console.log('Decoded token:', decoded);
"
```

## 📚 Additional Resources

- [JWT.io](https://jwt.io/) - JWT debugger and documentation
- [MongoDB Atlas](https://www.mongodb.com/atlas) - Database hosting
- [Express Security](https://expressjs.com/en/advanced/best-practices-security.html) - Security best practices 