# Transformer Cycle Hub - React Frontend

A modern React-based frontend for the Transformer Cycle Hub waste management and recycling platform.

## 🚀 Features

### Modern React Architecture
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **React Icons** - Beautiful icon library
- **Responsive Design** - Mobile-first approach
- **Component-Based** - Reusable and maintainable components

### Key Components
- **Header** - Navigation with mobile menu
- **Footer** - Social links and company info
- **CommunityMap** - Interactive recycling centers map
- **Home** - Landing page with hero and features
- **About** - Company information and mission
- **Pickup** - Waste pickup scheduling (to be implemented)
- **Tutorials** - Educational content (to be implemented)
- **Rewards** - Points and rewards system (to be implemented)
- **Contact** - Contact form (to be implemented)
- **Login** - Authentication (to be implemented)
- **Dashboard** - User dashboard (to be implemented)
- **AdminDashboard** - Admin panel (to be implemented)

## 📁 Project Structure

```
transformer-cycle-hub-react/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Header.css
│   │   ├── Footer.tsx
│   │   ├── Footer.css
│   │   ├── CommunityMap.tsx
│   │   └── CommunityMap.css
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Home.css
│   │   ├── About.tsx
│   │   ├── About.css
│   │   ├── Pickup.tsx
│   │   ├── Tutorials.tsx
│   │   ├── Rewards.tsx
│   │   ├── Contact.tsx
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   └── AdminDashboard.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── socket.ts
│   ├── types/
│   │   ├── user.ts
│   │   ├── pickup.ts
│   │   └── common.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary**: #2E8B57 (Sea Green)
- **Primary Dark**: #1a5632
- **Primary Light**: #4CAF50
- **Secondary**: #FF6B35 (Orange)
- **Accent**: #6A4C93 (Purple)
- **Light**: #f8f9fa
- **Dark**: #343a40

### Typography
- **Font Family**: Inter, Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: White background with rounded corners and shadow
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean input fields with focus states
- **Navigation**: Sticky header with mobile menu

## 🛠️ Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3005
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_SOCKET_URL=http://localhost:3005
```

### Backend Integration
The React app is configured to proxy requests to the backend server running on port 3005. Update the proxy setting in `package.json` if needed.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: > 768px

## 🎯 Key Features Implemented

### ✅ Completed
- [x] Project structure and configuration
- [x] Header with navigation
- [x] Footer with social links
- [x] Home page with hero section
- [x] About page with company info
- [x] CommunityMap component
- [x] Responsive design
- [x] TypeScript configuration
- [x] CSS styling system

### 🚧 In Progress
- [ ] Pickup scheduling page
- [ ] Tutorials page
- [ ] Rewards system
- [ ] Contact form
- [ ] Authentication
- [ ] User dashboard
- [ ] Admin dashboard
- [ ] API integration
- [ ] Socket.IO integration

## 🔗 Backend Integration

The React frontend is designed to work with the existing Node.js backend:

### API Endpoints
- Authentication: `/api/login`, `/api/register`
- Pickups: `/api/pickups`
- Contact: `/api/contact`
- Admin: `/api/admin/*`

### Socket.IO Events
- Real-time notifications
- Live updates
- Chat functionality

## 🎨 UI/UX Features

### Modern Design
- Clean and minimalist interface
- Smooth animations and transitions
- Consistent color scheme
- Professional typography

### User Experience
- Intuitive navigation
- Mobile-friendly design
- Fast loading times
- Accessible components

### Interactive Elements
- Hover effects on cards and buttons
- Loading states
- Error handling
- Success messages

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect GitHub repository
- **AWS S3**: Upload build files
- **Heroku**: Use buildpack

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For technical support:
- Check the browser console for errors
- Ensure the backend server is running
- Verify API endpoints are accessible
- Review the documentation

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Framework**: React 18 with TypeScript 