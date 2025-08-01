const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

// Import models
const RecyclingCenter = require('./models/RecyclingCenter');

// Sample recycling centers data
const sampleCenters = [
  {
    name: "Green Earth Recycling Center",
    description: "Comprehensive recycling facility accepting all types of materials. Professional staff and clean facility.",
    address: "123 Green Street, Nairobi, Kenya",
    phone: "+254-700-123-456",
    website: "https://greenearth-recycling.com",
    coordinates: {
      lat: -1.2921,
      lng: 36.8219
    },
    type: "recycling-center",
    services: ["plastic", "paper", "glass", "metal", "electronics"],
    operatingHours: {
      monday: { open: "08:00", close: "18:00" },
      tuesday: { open: "08:00", close: "18:00" },
      wednesday: { open: "08:00", close: "18:00" },
      thursday: { open: "08:00", close: "18:00" },
      friday: { open: "08:00", close: "18:00" },
      saturday: { open: "09:00", close: "16:00" },
      sunday: { open: "10:00", close: "14:00" }
    },
    rating: 4.5
  },
  {
    name: "EcoTech Electronics Recycling",
    description: "Specialized in electronic waste recycling. We safely dispose of computers, phones, and other electronics.",
    address: "456 Tech Avenue, Nairobi, Kenya",
    phone: "+254-700-234-567",
    website: "https://ecotech-electronics.com",
    coordinates: {
      lat: -1.3021,
      lng: 36.8319
    },
    type: "recycling-center",
    services: ["electronics", "batteries"],
    operatingHours: {
      monday: { open: "09:00", close: "17:00" },
      tuesday: { open: "09:00", close: "17:00" },
      wednesday: { open: "09:00", close: "17:00" },
      thursday: { open: "09:00", close: "17:00" },
      friday: { open: "09:00", close: "17:00" },
      saturday: { open: "10:00", close: "15:00" },
      sunday: { open: "Closed", close: "Closed" }
    },
    rating: 4.8
  },
  {
    name: "Community Composting Hub",
    description: "Organic waste composting facility. Turn your kitchen scraps into rich soil for your garden.",
    address: "789 Organic Lane, Nairobi, Kenya",
    phone: "+254-700-345-678",
    website: "https://community-composting.org",
    coordinates: {
      lat: -1.2821,
      lng: 36.8119
    },
    type: "composting-site",
    services: ["composting", "organic-waste"],
    operatingHours: {
      monday: { open: "07:00", close: "19:00" },
      tuesday: { open: "07:00", close: "19:00" },
      wednesday: { open: "07:00", close: "19:00" },
      thursday: { open: "07:00", close: "19:00" },
      friday: { open: "07:00", close: "19:00" },
      saturday: { open: "08:00", close: "18:00" },
      sunday: { open: "08:00", close: "18:00" }
    },
    rating: 4.2
  },
  {
    name: "Textile Recycling Partners",
    description: "Specialized in textile and clothing recycling. We accept old clothes, fabrics, and textile waste.",
    address: "321 Fabric Street, Nairobi, Kenya",
    phone: "+254-700-456-789",
    website: "https://textile-recycling-partners.com",
    coordinates: {
      lat: -1.2721,
      lng: 36.8019
    },
    type: "eco-partner",
    services: ["textiles", "clothing"],
    operatingHours: {
      monday: { open: "08:30", close: "17:30" },
      tuesday: { open: "08:30", close: "17:30" },
      wednesday: { open: "08:30", close: "17:30" },
      thursday: { open: "08:30", close: "17:30" },
      friday: { open: "08:30", close: "17:30" },
      saturday: { open: "09:00", close: "16:00" },
      sunday: { open: "Closed", close: "Closed" }
    },
    rating: 4.0
  },
  {
    name: "Glass & Metal Collection Point",
    description: "Convenient drop-off point for glass bottles and metal cans. Located in the city center.",
    address: "555 Collection Road, Nairobi, Kenya",
    phone: "+254-700-567-890",
    website: "",
    coordinates: {
      lat: -1.2921,
      lng: 36.8419
    },
    type: "drop-off-point",
    services: ["glass", "metal"],
    operatingHours: {
      monday: { open: "24/7", close: "24/7" },
      tuesday: { open: "24/7", close: "24/7" },
      wednesday: { open: "24/7", close: "24/7" },
      thursday: { open: "24/7", close: "24/7" },
      friday: { open: "24/7", close: "24/7" },
      saturday: { open: "24/7", close: "24/7" },
      sunday: { open: "24/7", close: "24/7" }
    },
    rating: 4.3
  },
  {
    name: "Paper Recycling Cooperative",
    description: "Community-run paper recycling facility. We accept newspapers, magazines, and office paper.",
    address: "777 Paper Mill Drive, Nairobi, Kenya",
    phone: "+254-700-678-901",
    website: "https://paper-recycling-coop.org",
    coordinates: {
      lat: -1.3021,
      lng: 36.8019
    },
    type: "eco-partner",
    services: ["paper", "cardboard"],
    operatingHours: {
      monday: { open: "08:00", close: "16:00" },
      tuesday: { open: "08:00", close: "16:00" },
      wednesday: { open: "08:00", close: "16:00" },
      thursday: { open: "08:00", close: "16:00" },
      friday: { open: "08:00", close: "16:00" },
      saturday: { open: "09:00", close: "14:00" },
      sunday: { open: "Closed", close: "Closed" }
    },
    rating: 4.6
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

// Create sample recycling centers
const createSampleCenters = async () => {
  try {
    // Clear existing centers
    await RecyclingCenter.deleteMany({});
    console.log('Cleared existing recycling centers');

    // Insert sample centers
    const createdCenters = await RecyclingCenter.insertMany(sampleCenters);
    console.log(`Created ${createdCenters.length} sample recycling centers`);

    console.log('Sample recycling centers created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating sample centers:', error);
    process.exit(1);
  }
};

// Run the script
connectDB().then(() => {
  createSampleCenters();
}); 