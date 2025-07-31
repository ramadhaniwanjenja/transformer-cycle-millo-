# 🌱 Transformer Cycle Hub

A modern React-based web application for promoting sustainable waste management and recycling practices. Transform your waste into valuable resources while earning rewards and contributing to a greener planet.

![Transformer Cycle Hub](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-7.5.0-green)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Environment Setup](#-environment-setup)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

Transformer Cycle Hub is a comprehensive waste management platform that connects users with recycling centers, provides educational content, and rewards sustainable practices. The application features a modern React frontend with TypeScript and a robust Node.js backend with MongoDB.

### Key Objectives
- ♻️ Promote sustainable waste management practices
- 🗺️ Connect users with local recycling centers
- 📚 Provide educational content and tutorials
- 🎁 Reward users for sustainable actions
- 📱 Modern, responsive user interface

## ✨ Features

### 🌟 Core Features
- **User Authentication**: Secure login/signup with JWT tokens
- **Interactive Map**: Find nearby recycling centers with Google Maps integration
- **Waste Pickup**: Schedule waste collection services
- **Educational Content**: Tutorials and guides for sustainable practices
- **Rewards System**: Earn points for recycling activities
- **User Dashboard**: Track your recycling progress and rewards
- **Admin Panel**: Manage users, centers, and content

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Real-time Updates**: Live notifications and status updates
- **Accessibility**: WCAG compliant design

### 🔧 Technical Features
- **TypeScript**: Type-safe development
- **React Router**: Client-side routing
- **Socket.IO**: Real-time communication
- **MongoDB**: Scalable data storage
- **JWT Authentication**: Secure user sessions
- **Email Integration**: Automated notifications

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **React Icons** - Beautiful icon library
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time features

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **Socket.IO** - Real-time communication

### Development Tools
- **Create React App** - Project scaffolding
- **ESLint** - Code quality
- **Nodemon** - Development server
- **Helmet** - Security middleware

## 📁 Project Structure

```
transformer-cycle-hub-react/
├── public/                 # Static files
│   ├── images/            # Project images
│   ├── index.html         # Main HTML file
│   └── manifest.json      # PWA manifest
├── src/                   # React source code
│   ├── components/        # Reusable components
│   │   ├── Header.tsx    # Navigation header
│   │   ├── Footer.tsx    # Site footer
│   │   └── CommunityMap.tsx # Interactive map
│   ├── pages/            # Page components
│   │   ├── Home.tsx      # Landing page
│   │   ├── About.tsx     # About page
│   │   ├── Pickup.tsx    # Waste pickup
│   │   ├── Tutorials.tsx # Educational content
│   │   ├── Rewards.tsx   # Rewards system
│   │   ├── Contact.tsx   # Contact form
│   │   ├── Login.tsx     # Authentication
│   │   ├── Dashboard.tsx # User dashboard
│   │   └── AdminDashboard.tsx # Admin panel
│   ├── services/         # API services
│   ├── types/           # TypeScript types
│   ├── App.tsx          # Main app component
│   └── index.tsx        # App entry point
├── backend/              # Node.js backend
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   └── server.js        # Server entry point
├── package.json         # Frontend dependencies
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v7.5 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/transformer-cycle-hub-react.git
   cd transformer-cycle-hub-react
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # Create .env file in backend directory
   cp backend/.env.example backend/.env
   ```

5. **Configure environment variables**
   ```env
   # Backend .env
   PORT=3005
   MONGODB_URI=mongodb://localhost:27017/transformer-cycle-hub
   JWT_SECRET=your-secret-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   CORS_ORIGIN=http://localhost:3000
   ```

6. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3005
   - Health Check: http://localhost:3005/api/health

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### User Management
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Pickup Services
- `GET /api/pickups` - Get all pickups
- `POST /api/pickups` - Create pickup request
- `PUT /api/pickups/:id` - Update pickup
- `DELETE /api/pickups/:id` - Cancel pickup

### Recycling Centers
- `GET /api/recycling-centers` - Get all centers
- `POST /api/recycling-centers` - Add new center
- `PUT /api/recycling-centers/:id` - Update center
- `DELETE /api/recycling-centers/:id` - Remove center

### Tutorials & Education
- `GET /api/tutorials` - Get all tutorials
- `POST /api/tutorials` - Create tutorial
- `PUT /api/tutorials/:id` - Update tutorial
- `DELETE /api/tutorials/:id` - Delete tutorial

### Rewards System
- `GET /api/rewards` - Get all rewards
- `POST /api/rewards` - Create reward
- `PUT /api/rewards/:id` - Update reward
- `DELETE /api/rewards/:id` - Delete reward

## 🔧 Environment Setup

### Required Environment Variables

#### Backend (.env)
```env
# Server Configuration
PORT=3005
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/transformer-cycle-hub

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# CORS
CORS_ORIGIN=http://localhost:3000

# Google Maps API
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3005/api
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### Database Setup

1. **Install MongoDB**
   - Download from [MongoDB Official Site](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Atlas (cloud service)

2. **Create Database**
   ```bash
   mongosh
   use transformer-cycle-hub
   ```

3. **Initialize Collections**
   The application will automatically create collections when first used.

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Deploy to Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`

### Backend Deployment (Heroku/Railway)

1. **Prepare for deployment**
   ```bash
   cd backend
   npm install
   ```

2. **Set environment variables**
   - Configure all required environment variables
   - Set `NODE_ENV=production`

3. **Deploy to Heroku**
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and run**
   ```bash
   docker build -t transformer-cycle-hub .
   docker run -p 3000:3000 transformer-cycle-hub
   ```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test your changes**
   ```bash
   npm test
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the database solution
- Google Maps for mapping services
- All contributors and supporters

## 📞 Support

If you have any questions or need help:

- 📧 Email: support@transformercyclehub.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/transformer-cycle-hub-react/issues)
- 📖 Documentation: [Wiki](https://github.com/yourusername/transformer-cycle-hub-react/wiki)

---

**Made with ❤️ for a sustainable future**

*Transform your waste, transform the world!*
