import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Pickup from './pages/Pickup';
import Tutorials from './pages/Tutorials';
import Rewards from './pages/Rewards';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

// Simple authentication check (replace with proper auth later)
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

// Check if user is admin
const isAdmin = () => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    try {
      const user = JSON.parse(userData);
      return user.role === 'admin';
    } catch (error) {
      return false;
    }
  }
  return false;
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};

// Admin Route Component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('AdminRoute check:', {
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
    userData: localStorage.getItem('userData')
  });
  
  if (!isAuthenticated()) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  if (!isAdmin()) {
    console.log('Not admin, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }
  console.log('Admin access granted');
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pickup" element={<ProtectedRoute><Pickup /></ProtectedRoute>} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 