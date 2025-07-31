# 🚀 Vercel Deployment Guide

## 📋 Prerequisites

1. **GitHub Account** - Your code should be on GitHub
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **MongoDB Atlas** - For production database
4. **Google Maps API Key** - For map functionality

## 🔧 Step 1: Prepare Your Environment

### 1.1 Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Add your IP to whitelist

### 1.2 Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Maps JavaScript API
4. Create API key

## 🚀 Step 2: Deploy Backend to Vercel

### 2.1 Prepare Backend
```bash
# Make sure you're in the project root
cd backend

# Install Vercel CLI if not installed
npm install -g vercel

# Login to Vercel
vercel login
```

### 2.2 Deploy Backend
```bash
# Deploy backend
vercel --prod

# When prompted:
# - Set up and deploy: Yes
# - Which scope: Your account
# - Link to existing project: No
# - Project name: transformer-cycle-hub-backend
# - Directory: ./ (current directory)
```

### 2.3 Configure Backend Environment Variables
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your backend project
3. Go to Settings → Environment Variables
4. Add these variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/transformer-cycle-hub
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CORS_ORIGIN=https://your-frontend-domain.vercel.app
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NODE_ENV=production
```

### 2.4 Redeploy Backend
```bash
vercel --prod
```

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Get Backend URL
After backend deployment, you'll get a URL like:
`https://transformer-cycle-hub-backend.vercel.app`

### 3.2 Configure Frontend Environment
Create `.env.local` in the root directory:
```env
REACT_APP_API_URL=https://transformer-cycle-hub-backend.vercel.app/api
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### 3.3 Deploy Frontend
```bash
# Go back to project root
cd ..

# Deploy frontend
vercel --prod

# When prompted:
# - Set up and deploy: Yes
# - Which scope: Your account
# - Link to existing project: No
# - Project name: transformer-cycle-hub-frontend
# - Directory: ./ (current directory)
```

## 🔧 Step 4: Configure Frontend Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your frontend project
3. Go to Settings → Environment Variables
4. Add these variables:

```env
REACT_APP_API_URL=https://transformer-cycle-hub-backend.vercel.app/api
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### 4.1 Redeploy Frontend
```bash
vercel --prod
```

## 🧪 Step 5: Test Your Deployment

### 5.1 Test Backend
```bash
# Test health endpoint
curl https://transformer-cycle-hub-backend.vercel.app/api/health
```

### 5.2 Test Frontend
1. Visit your frontend URL
2. Test all features:
   - Navigation
   - Map functionality
   - Forms
   - API calls

## 🔄 Step 6: Update CORS Settings

After getting your frontend URL, update the backend CORS:

1. Go to backend project in Vercel Dashboard
2. Update `CORS_ORIGIN` environment variable:
```env
CORS_ORIGIN=https://transformer-cycle-hub-frontend.vercel.app
```
3. Redeploy backend: `vercel --prod`

## 🚀 Quick Deployment Script

You can also use the provided deployment script:

```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## 📝 Environment Variables Summary

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/transformer-cycle-hub
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CORS_ORIGIN=https://your-frontend-domain.vercel.app
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NODE_ENV=production
```

### Frontend (.env.local)
```env
REACT_APP_API_URL=https://your-backend-domain.vercel.app/api
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Update CORS_ORIGIN in backend environment variables
   - Redeploy backend

2. **API Not Found**
   - Check if backend URL is correct in frontend environment
   - Verify backend is deployed and running

3. **Database Connection Issues**
   - Check MongoDB Atlas connection string
   - Verify IP whitelist in MongoDB Atlas

4. **Build Errors**
   - Check for TypeScript errors
   - Verify all dependencies are installed

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints individually
4. Check browser console for frontend errors

## 🎉 Success!

After successful deployment, you'll have:
- 🌐 Frontend: `https://your-app-name.vercel.app`
- 🔧 Backend: `https://your-backend-name.vercel.app`
- 📊 MongoDB Atlas database
- 🗺️ Google Maps integration

Your Transformer Cycle Hub is now live! 🚀 