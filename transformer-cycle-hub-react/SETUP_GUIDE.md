# Transformer Cycle Hub - Complete Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Step 1: MongoDB Atlas Setup

**Option A: Use Your Own MongoDB Atlas Cluster (Recommended)**

1. Go to https://www.mongodb.com/atlas
2. Create a free account
3. Create a new cluster (FREE tier)
4. Set up database access:
   - Username: `your_username`
   - Password: `your_password`
   - Privileges: Read and write to any database
5. Set up network access:
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
6. Get your connection string and update `backend/config.env`:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/transformer_cycle_hub?retryWrites=true&w=majority
```

**Option B: Use Demo Cluster (For Testing)**

The current config uses a demo cluster. You can test with this, but for production, use your own cluster.

### Step 2: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 3: Test Database Connection

```bash
cd backend
node test-db.js
```

You should see: "✅ MongoDB Connected Successfully!"

### Step 4: Start the Backend Server

```bash
cd backend
npm start
```

You should see:
- "🚀 Server running on port 3005"
- "📦 MongoDB Connected: [your-cluster]"

### Step 5: Start the Frontend

Open a new terminal:

```bash
npm start
```

You should see the React app running on http://localhost:3000

### Step 6: Test the Application

1. Open http://localhost:3000
2. Click "Sign Up" to create an account
3. Fill in the registration form
4. You should be redirected to the dashboard
5. Try logging out and logging back in

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error: "MongoDB connection error"**

Solutions:
1. Check if your MongoDB Atlas cluster is running
2. Verify your connection string in `backend/config.env`
3. Make sure your IP is whitelisted in MongoDB Atlas
4. Test connection: `cd backend && node test-db.js`

### Proxy Errors

**Error: "Could not proxy request"**

Solutions:
1. Make sure backend is running on port 3005
2. Check if frontend proxy is correctly set in `package.json`
3. Restart both frontend and backend

### Authentication Issues

**Problem: "Could not sign up/login"**

Solutions:
1. Check if backend is running
2. Check browser console for errors
3. Verify API endpoints are working
4. Check if database is connected

### Email Issues

**Note**: The current system doesn't send actual emails. Email verification is simulated.

To add real email functionality:
1. Set up email service (Gmail, SendGrid, etc.)
2. Uncomment email config in `backend/config.env`
3. Add email verification logic

## 📁 Project Structure

```
transformer-cycle-hub-react/
├── backend/                 # Node.js/Express backend
│   ├── config.env          # Environment variables
│   ├── server.js           # Main server file
│   ├── routes/             # API routes
│   ├── models/             # Database models
│   └── middleware/         # Authentication middleware
├── src/                    # React frontend
│   ├── pages/             # Page components
│   ├── components/        # Reusable components
│   └── App.tsx           # Main app component
└── package.json           # Frontend dependencies
```

## 🛠️ Development Commands

```bash
# Start frontend (development)
npm start

# Start backend (development)
cd backend && npm start

# Test database connection
cd backend && node test-db.js

# Build frontend for production
npm run build
```

## 🔒 Security Notes

1. **JWT Secret**: Change the JWT_SECRET in production
2. **MongoDB**: Use your own MongoDB Atlas cluster for production
3. **Environment Variables**: Never commit sensitive data to git
4. **CORS**: Configure CORS properly for production

## 📧 Email Setup (Optional)

To add real email functionality:

1. **Gmail Setup**:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_FROM=your_email@gmail.com
   ```

2. **SendGrid Setup**:
   ```env
   EMAIL_SERVICE=sendgrid
   EMAIL_API_KEY=your_sendgrid_api_key
   EMAIL_FROM=your_email@domain.com
   ```

## 🚀 Deployment

### Backend Deployment
- Deploy to Heroku, Railway, or similar
- Set environment variables
- Use MongoDB Atlas for database

### Frontend Deployment
- Build: `npm run build`
- Deploy to Netlify, Vercel, or similar
- Update API endpoints for production

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Verify all dependencies are installed
3. Check if MongoDB Atlas is properly configured
4. Ensure both frontend and backend are running 