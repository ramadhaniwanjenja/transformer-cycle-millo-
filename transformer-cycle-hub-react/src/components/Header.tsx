import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { isAuthenticated as checkAuth, isAdmin, getUserData, logout } from '../utils/auth';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status and user role
    const updateAuthState = () => {
      const auth = checkAuth();
      const userData = getUserData();
      
      setIsAuthenticated(!!auth);
      setUserRole(userData?.role || 'user');
    };

    // Check on mount
    updateAuthState();

    // Listen for storage changes (only when localStorage changes in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'isAuthenticated' || e.key === 'userData' || e.key === 'accessToken') {
        updateAuthState();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check when window gains focus (user returns to tab)
    const handleFocus = () => {
      updateAuthState();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setUserRole('');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          Transformer Cycle Hub
        </Link>
        
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <Link 
                to="/" 
                className={isActive('/') ? 'active' : ''} 
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={isActive('/about') ? 'active' : ''} 
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/pickup" 
                className={isActive('/pickup') ? 'active' : ''} 
                onClick={closeMenu}
              >
                Schedule Pickup
              </Link>
            </li>
            <li>
              <Link 
                to="/tutorials" 
                className={isActive('/tutorials') ? 'active' : ''} 
                onClick={closeMenu}
              >
                Upcycling Tutorials
              </Link>
            </li>
            <li>
              <Link 
                to="/rewards" 
                className={isActive('/rewards') ? 'active' : ''} 
                onClick={closeMenu}
              >
                Rewards
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={isActive('/contact') ? 'active' : ''} 
                onClick={closeMenu}
              >
                Contact Us
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link 
                    to="/dashboard" 
                    className={`dashboard-link ${isActive('/dashboard') ? 'active' : ''}`} 
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                </li>
                {userRole === 'admin' && (
                  <li>
                    <Link 
                      to="/admin" 
                      className={`admin-link ${isActive('/admin') ? 'active' : ''}`} 
                      onClick={closeMenu}
                    >
                      Admin
                    </Link>
                  </li>
                )}
                <li>
                  <span className="user-role">
                    {userRole === 'admin' ? '👑 Admin' : '👤 User'}
                  </span>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="logout-link"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className={isActive('/login') ? 'active' : ''} 
                    onClick={closeMenu}
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/signup" 
                    className={`dashboard-link ${isActive('/signup') ? 'active' : ''}`} 
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default Header; 