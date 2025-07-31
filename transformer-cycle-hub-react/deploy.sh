#!/bin/bash

echo "🚀 Starting Transformer Cycle Hub Deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy Backend First
echo "🔧 Deploying Backend API..."
cd backend
vercel --prod --yes

# Get the backend URL
BACKEND_URL=$(vercel ls | grep transformer-cycle-hub-backend | awk '{print $2}')
echo "✅ Backend deployed at: $BACKEND_URL"

# Go back to root
cd ..

# Update frontend environment with backend URL
echo "🔧 Updating Frontend Environment..."
echo "REACT_APP_API_URL=$BACKEND_URL/api" > .env.local
echo "REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here" >> .env.local

# Deploy Frontend
echo "🎨 Deploying Frontend..."
vercel --prod --yes

echo "✅ Deployment Complete!"
echo "🌐 Frontend: https://your-app-name.vercel.app"
echo "🔧 Backend: $BACKEND_URL" 