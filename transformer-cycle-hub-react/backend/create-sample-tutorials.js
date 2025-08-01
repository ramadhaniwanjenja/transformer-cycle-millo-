const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

// Import models
const Tutorial = require('./models/Tutorial');

// Sample tutorial data
const sampleTutorials = [
  {
    title: "Plastic Bottle Plant Pot",
    description: "Transform empty plastic bottles into beautiful plant pots for your garden. Learn how to cut, decorate, and create drainage holes for healthy plant growth.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual tutorial video
    thumbnail: "",
    category: "plastic",
    difficulty: "beginner",
    duration: 15,
    pointsReward: 10,
    materials: [
      { name: "Empty plastic bottle", quantity: "1", optional: false },
      { name: "Scissors", quantity: "1", optional: false },
      { name: "Acrylic paint", quantity: "As needed", optional: true },
      { name: "Paintbrush", quantity: "1", optional: true }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Clean the bottle",
        description: "Remove labels and clean the plastic bottle thoroughly with soap and water."
      },
      {
        stepNumber: 2,
        title: "Cut the bottle",
        description: "Cut the top portion of the bottle to create the pot shape. Leave about 2/3 of the bottle for the pot."
      },
      {
        stepNumber: 3,
        title: "Create drainage holes",
        description: "Use a hot nail or drill to create small holes in the bottom for water drainage."
      },
      {
        stepNumber: 4,
        title: "Decorate (optional)",
        description: "Paint or decorate the pot with acrylic paint and let it dry completely."
      },
      {
        stepNumber: 5,
        title: "Add soil and plant",
        description: "Fill with potting soil and plant your seeds or small plants."
      }
    ]
  },
  {
    title: "Paper Mache Bowl",
    description: "Create beautiful decorative bowls using old newspapers and paper mache technique. Perfect for storing small items or as decorative pieces.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual tutorial video
    thumbnail: "",
    category: "paper",
    difficulty: "beginner",
    duration: 25,
    pointsReward: 10,
    materials: [
      { name: "Old newspapers", quantity: "Several sheets", optional: false },
      { name: "Flour", quantity: "1 cup", optional: false },
      { name: "Water", quantity: "2 cups", optional: false },
      { name: "Bowl for molding", quantity: "1", optional: false },
      { name: "Paint", quantity: "As needed", optional: true }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Prepare paper mache paste",
        description: "Mix 1 cup flour with 2 cups water to create a smooth paste."
      },
      {
        stepNumber: 2,
        title: "Tear newspaper strips",
        description: "Tear newspaper into strips about 1-2 inches wide and 6-8 inches long."
      },
      {
        stepNumber: 3,
        title: "Cover the mold",
        description: "Cover your bowl mold with plastic wrap, then apply newspaper strips dipped in paste."
      },
      {
        stepNumber: 4,
        title: "Build layers",
        description: "Apply 3-4 layers of paper mache, allowing each layer to dry between applications."
      },
      {
        stepNumber: 5,
        title: "Remove and finish",
        description: "Once dry, remove from mold and paint or decorate as desired."
      }
    ]
  },
  {
    title: "Glass Jar Lantern",
    description: "Transform glass jars into beautiful lanterns for outdoor lighting. Perfect for creating ambiance in your garden or patio.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual tutorial video
    thumbnail: "",
    category: "glass",
    difficulty: "intermediate",
    duration: 20,
    pointsReward: 10,
    materials: [
      { name: "Glass jar", quantity: "1", optional: false },
      { name: "Wire", quantity: "1 foot", optional: false },
      { name: "Tea light candle", quantity: "1", optional: false },
      { name: "Decorative elements", quantity: "As needed", optional: true }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Clean the jar",
        description: "Remove labels and clean the glass jar thoroughly."
      },
      {
        stepNumber: 2,
        title: "Create wire handle",
        description: "Bend wire into a handle shape and attach to the jar rim."
      },
      {
        stepNumber: 3,
        title: "Add decorations",
        description: "Glue decorative elements like beads, shells, or colored paper to the jar."
      },
      {
        stepNumber: 4,
        title: "Insert candle",
        description: "Place a tea light candle inside the jar."
      },
      {
        stepNumber: 5,
        title: "Hang and enjoy",
        description: "Hang your lantern outdoors and light the candle for beautiful ambient lighting."
      }
    ]
  },
  {
    title: "Denim Tote Bag",
    description: "Transform old jeans into a stylish and durable tote bag. Perfect for shopping or carrying everyday items.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual tutorial video
    thumbnail: "",
    category: "textile",
    difficulty: "intermediate",
    duration: 30,
    pointsReward: 10,
    materials: [
      { name: "Old jeans", quantity: "1 pair", optional: false },
      { name: "Sewing machine", quantity: "1", optional: false },
      { name: "Thread", quantity: "1 spool", optional: false },
      { name: "Scissors", quantity: "1", optional: false },
      { name: "Fabric for lining", quantity: "1 yard", optional: true }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Cut the jeans",
        description: "Cut the legs off the jeans and open them to create flat fabric pieces."
      },
      {
        stepNumber: 2,
        title: "Create bag shape",
        description: "Cut the fabric into rectangles for the front, back, and sides of the bag."
      },
      {
        stepNumber: 3,
        title: "Sew the pieces",
        description: "Sew the fabric pieces together to create the bag shape."
      },
      {
        stepNumber: 4,
        title: "Add handles",
        description: "Create handles from the remaining denim and attach them to the bag."
      },
      {
        stepNumber: 5,
        title: "Finish edges",
        description: "Finish all raw edges and add any decorative touches."
      }
    ]
  },
  {
    title: "Tin Can Wind Chime",
    description: "Create beautiful wind chimes from old tin cans. Learn metalworking basics while creating a musical garden decoration.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual tutorial video
    thumbnail: "",
    category: "metal",
    difficulty: "advanced",
    duration: 45,
    pointsReward: 10,
    materials: [
      { name: "Tin cans", quantity: "3-5", optional: false },
      { name: "Wire", quantity: "2 feet", optional: false },
      { name: "Hammer and nail", quantity: "1 set", optional: false },
      { name: "Paint", quantity: "As needed", optional: true }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Clean and prepare cans",
        description: "Remove labels and clean the tin cans thoroughly."
      },
      {
        stepNumber: 2,
        title: "Create holes",
        description: "Use hammer and nail to create holes in the bottom of each can."
      },
      {
        stepNumber: 3,
        title: "Paint cans",
        description: "Paint the cans with weather-resistant paint and let dry."
      },
      {
        stepNumber: 4,
        title: "Assemble chime",
        description: "Thread wire through the holes and suspend the cans at different lengths."
      },
      {
        stepNumber: 5,
        title: "Hang and test",
        description: "Hang your wind chime outdoors and enjoy the musical sounds."
      }
    ]
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

// Create sample tutorials
const createSampleTutorials = async () => {
  try {
    // Clear existing tutorials
    await Tutorial.deleteMany({});
    console.log('Cleared existing tutorials');

    // Insert sample tutorials
    const createdTutorials = await Tutorial.insertMany(sampleTutorials);
    console.log(`Created ${createdTutorials.length} sample tutorials`);

    console.log('Sample tutorials created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating sample tutorials:', error);
    process.exit(1);
  }
};

// Run the script
connectDB().then(() => {
  createSampleTutorials();
}); 