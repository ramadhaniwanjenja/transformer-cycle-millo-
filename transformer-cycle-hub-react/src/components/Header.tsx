import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
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
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/');
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