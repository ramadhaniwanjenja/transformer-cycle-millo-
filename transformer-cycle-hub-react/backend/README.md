# Transformer Cycle Hub - Backend API

This is the backend API for the Transformer Cycle Hub application, built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication**: Sign up, sign in, and JWT-based authentication
- **User Management**: User profiles, roles, and preferences
- **Security**: Password hashing, JWT tokens, and input validation
- **Database**: MongoDB with Mongoose ODM
- **API Documentation**: RESTful API endpoints

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   - Copy `config.env` and update the values
   - Set your MongoDB connection string
   - Set a secure JWT secret

3. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token

### Users
- `GET /api/users/profile` - Get user profile
- `GET /api/users` - Get all users (admin only)

### Pickups
- `GET /api/pickups` - Get user pickups

## 🔧 Environment Variables

Create a `config.env` file with the following variables:

```env
# Server Configuration
PORT=3005
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/transformer_cycle_hub

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Security
BCRYPT_ROUNDS=12
```

## 🗄️ Database Schema

### User Model
- `firstName`, `lastName` - User's name
- `email` - Unique email address
- `phone` - Phone number
- `password` - Hashed password
- `role` - User role (user/admin)
- `greenPoints` - Points earned for eco-friendly actions
- `isActive` - Account status
- `preferences` - User preferences
- `address` - User address information

## 🔐 Security Features

- **Password Hashing**: Using bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Using express-validator
- **CORS Protection**: Configured for frontend origin
- **Helmet**: Security headers
- **Rate Limiting**: (To be implemented)

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

## 📝 API Documentation

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123"
}
```

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

## 🚀 Deployment

1. Set `NODE_ENV=production`
2. Update MongoDB connection string
3. Set secure JWT secret
4. Configure CORS origin
5. Use PM2 or similar process manager

## 📞 Support

For issues and questions, please contact the development team. 