const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Reward = require('./models/Reward');

// Sample reward data
const sampleRewards = [
  {
    name: "Eco-Friendly Water Bottle",
    description: "Reusable stainless steel water bottle to reduce plastic waste. Perfect for daily use and keeps drinks cold for 24 hours.",
    pointsRequired: 50,
    category: "eco-friendly",
    stock: 100
  },
  {
    name: "Bamboo Toothbrush Set",
    description: "Set of 4 biodegradable bamboo toothbrushes. Environmentally friendly alternative to plastic toothbrushes.",
    pointsRequired: 30,
    category: "eco-friendly",
    stock: 200
  },
  {
    name: "Reusable Shopping Bag",
    description: "Durable canvas shopping bag to replace plastic bags. Folds compactly and holds up to 20kg.",
    pointsRequired: 25,
    category: "eco-friendly",
    stock: 150
  },
  {
    name: "Plant a Tree Certificate",
    description: "We'll plant a tree in your name to help combat climate change. You'll receive a certificate with the tree's location.",
    pointsRequired: 100,
    category: "eco-friendly",
    stock: -1 // Unlimited
  },
  {
    name: "$10 Gift Card - Local Eco Store",
    description: "Gift card for a local environmentally conscious store. Support local businesses while shopping sustainably.",
    pointsRequired: 75,
    category: "gift-card",
    stock: 50
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "100% organic cotton t-shirt with our recycling logo. Comfortable, sustainable, and stylish.",
    pointsRequired: 120,
    category: "merchandise",
    stock: 75
  },
  {
    name: "Recycling Workshop Pass",
    description: "Free pass to attend our monthly recycling and upcycling workshop. Learn new skills and meet like-minded people.",
    pointsRequired: 80,
    category: "experience",
    stock: 25
  },
  {
    name: "Eco-Friendly Cleaning Kit",
    description: "Complete kit with natural cleaning products and reusable cloths. Reduce chemical waste and plastic packaging.",
    pointsRequired: 90,
    category: "eco-friendly",
    stock: 60
  },
  {
    name: "Solar-Powered Phone Charger",
    description: "Portable solar charger for your phone. Harness the power of the sun and reduce electricity consumption.",
    pointsRequired: 150,
    category: "eco-friendly",
    stock: 30
  },
  {
    name: "Community Garden Plot",
    description: "Reserve a plot in our community garden for 3 months. Grow your own vegetables and contribute to local food sustainability.",
    pointsRequired: 200,
    category: "experience",
    stock: 10
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Create sample rewards
const createSampleRewards = async () => {
  try {
    // Clear existing rewards
    await Reward.deleteMany({});
    console.log('Cleared existing rewards');

    // Insert sample rewards
    const createdRewards = await Reward.insertMany(sampleRewards);
    console.log(`Created ${createdRewards.length} sample rewards`);

    console.log('Sample rewards created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating sample rewards:', error);
    process.exit(1);
  }
};

// Run the script
connectDB().then(() => {
  createSampleRewards();
}); 