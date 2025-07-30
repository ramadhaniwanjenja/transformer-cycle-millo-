# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Recommended - Free Cloud Database)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier)

### Step 2: Get Connection String
1. In your Atlas dashboard, click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<username>`, `<password>`, and `<cluster-url>` with your actual values

### Step 3: Update config.env
Replace the MONGODB_URI in `config.env` with your Atlas connection string:
```
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster_url/transformer_cycle_hub?retryWrites=true&w=majority
```

## Option 2: Local MongoDB Installation

### Windows
1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Install with default settings
3. Start MongoDB service
4. Use the local connection string in `config.env`:
```
MONGODB_URI=mongodb://localhost:27017/transformer_cycle_hub
```

### macOS (using Homebrew)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

### Linux (Ubuntu)
```bash
sudo apt update
sudo apt install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

## Option 3: Docker (Alternative)

If you have Docker installed:
```bash
docker run --name mongodb -d -p 27017:27017 mongo:latest
```

## Testing the Connection

After setting up MongoDB, test the connection:
```bash
node test-db.js
```

You should see:
- "📡 URI: [your connection string]"
- "📦 MongoDB Connected: [host]"
- "✅ Database connection successful!" 