import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { contactAPI } from '../services/api';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear messages when user starts typing
    if (successMessage) setSuccessMessage('');
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await contactAPI.sendMessage(formData);

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        // Clear form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error: any) {
      console.error('Contact form error:', error);
      
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map((err: any) => err.msg).join(', ');
        setErrorMessage(errorMessages);
      } else if (error.message === 'Network Error') {
        setErrorMessage('Unable to connect to server. Please check your internet connection.');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="card">
        <h1>Contact Us</h1>
        <p>Get in touch with us for any questions or support.</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-form card">
          <h2>Send us a Message</h2>
          
          {successMessage && (
            <div className="success-message">
              <FaCheckCircle />
              <span>{successMessage}</span>
            </div>
          )}
          
          {errorMessage && (
            <div className="error-message">
              <FaExclamationCircle />
              <span>{errorMessage}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required 
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required 
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required 
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5} 
                required 
                disabled={isLoading}
              />
            </div>
            
            <button 
              type="submit" 
              className={`btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
        
        <div className="contact-info card">
          <h2>Contact Information</h2>
          <div className="info-item">
            <FaEnvelope />
            <div>
              <h3>Email</h3>
              <p>info@transformercyclehub.com</p>
            </div>
          </div>
          
          <div className="info-item">
            <FaPhone />
            <div>
              <h3>Phone</h3>
              <p>+254 700 000 000</p>
            </div>
          </div>
          
          <div className="info-item">
            <FaMapMarkerAlt />
            <div>
              <h3>Address</h3>
              <p>Nairobi, Kenya</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 