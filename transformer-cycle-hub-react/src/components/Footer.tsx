import React from 'react';
import { FaHeart, FaLeaf } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Transformer Cycle Hub</h3>
            <p>Transforming Waste, Building Communities</p>
            <p>Your hub for sustainable living in Kenya</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/pickup">Schedule Pickup</a></li>
              <li><a href="/tutorials">Tutorials</a></li>
              <li><a href="/rewards">Rewards</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Email: info@transformercyclehub.com</p>
            <p>Phone: +254 716677792</p>
            <p>Address: Nairobi, Kenya</p>
          </div>
          
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            © 2024 Transformer Cycle Hub. Made with <FaHeart className="heart-icon" /> and <FaLeaf className="leaf-icon" /> for a greener future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 