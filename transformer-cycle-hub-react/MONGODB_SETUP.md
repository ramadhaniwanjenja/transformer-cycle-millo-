# MongoDB Atlas Setup Guide

## Quick Setup for MongoDB Atlas

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Click "Try Free" or "Get Started Free"
3. Create an account (no credit card required)

### Step 2: Create a Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region close to you
5. Click "Create"

### Step 3: Set Up Database Access
1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (remember these!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

### Step 4: Set Up Network Access
1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Your Connection String
1. Go back to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string

### Step 6: Update Your Configuration
Replace the MONGODB_URI in `backend/config.env` with your connection string:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/transformer_cycle_hub?retryWrites=true&w=majority
```

Replace:
- `your_username` with your database username
- `your_password` with your database password
- `your_cluster` with your actual cluster name

### Step 7: Test Your Connection
Run your backend server:
```bash
cd backend
npm start
```

You should see: "📦 MongoDB Connected: [your-cluster-name]"

## Alternative: Use Demo Cluster (For Testing)
If you want to test immediately, you can use this demo connection (temporary):

```env
MONGODB_URI=mongodb+srv://demo:demo123@cluster0.mongodb.net/transformer_cycle_hub?retryWrites=true&w=majority
```

**Note**: This demo cluster is for testing only and may not always be available. 