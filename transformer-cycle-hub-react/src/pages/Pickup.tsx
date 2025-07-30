import React, { useState } from 'react';
import { FaRecycle, FaCalendar, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import axios from 'axios';
import './Pickup.css';

const Pickup: React.FC = () => {
  const [formData, setFormData] = useState({
    wasteType: '',
    quantity: '',
    pickupDate: '',
    pickupTime: '',
    address: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Get auth token
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        setSubmitMessage('Please login to submit a pickup request.');
        return;
      }

      const response = await axios.post('/api/pickups', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setSubmitMessage('Pickup scheduled successfully! You will receive a confirmation email shortly.');
        setFormData({
          wasteType: '',
          quantity: '',
          pickupDate: '',
          pickupTime: '',
          address: '',
          notes: ''
        });
      }
    } catch (error: any) {
      console.error('Pickup submission error:', error);
      
      if (error.response?.data?.message) {
        setSubmitMessage(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map((err: any) => err.msg).join(', ');
        setSubmitMessage(errorMessages);
      } else if (error.message === 'Network Error') {
        setSubmitMessage('Unable to connect to server. Please check your internet connection.');
      } else {
        setSubmitMessage('Failed to schedule pickup. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pickup-page">
      <div className="pickup-hero">
        <div className="hero-content">
          <h1>Schedule Waste Pickup</h1>
          <p>Easily request pickups for your recyclable waste and earn points for your eco-friendly actions.</p>
        </div>
      </div>

      <div className="pickup-content">
        <div className="pickup-form-card card">
          <h2>Request Pickup</h2>
          <p>Fill out the form below to schedule a waste pickup. You'll earn 15 points for each pickup!</p>
          
          <form className="pickup-form" onSubmit={handleSubmit}>
            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('successfully') ? 'success' : 'error'}`}>
                {submitMessage}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="wasteType">Waste Type</label>
              <select 
                id="wasteType" 
                value={formData.wasteType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select waste type</option>
                <option value="plastic">Plastic Waste</option>
                <option value="paper">Paper & Cardboard</option>
                <option value="glass">Glass Bottles</option>
                <option value="metal">Metal Cans</option>
                <option value="ewaste">E-Waste</option>
                <option value="mixed">Mixed Recyclables</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity (kg)</label>
              <input 
                type="number" 
                id="quantity" 
                min="1" 
                max="100" 
                value={formData.quantity}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="pickupDate">Preferred Pickup Date</label>
              <input 
                type="date" 
                id="pickupDate" 
                value={formData.pickupDate}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="pickupTime">Preferred Time</label>
              <select 
                id="pickupTime" 
                value={formData.pickupTime}
                onChange={handleInputChange}
                required
              >
                <option value="">Select time</option>
                <option value="morning">Morning (8AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 4PM)</option>
                <option value="evening">Evening (4PM - 8PM)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="address">Pickup Address</label>
              <textarea 
                id="address" 
                rows={3} 
                value={formData.address}
                onChange={handleInputChange}
                required 
                placeholder="Enter your full address"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Additional Notes</label>
              <textarea 
                id="notes" 
                rows={3} 
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special instructions or notes"
              ></textarea>
            </div>

            <button type="submit" className={`btn ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
              <FaRecycle /> {isSubmitting ? 'Scheduling...' : 'Schedule Pickup'}
            </button>
          </form>
        </div>

        <div className="pickup-info card">
          <h3>How It Works</h3>
          <div className="info-steps">
            <div className="step">
              <div className="step-icon">
                <FaCalendar />
              </div>
              <div className="step-content">
                <h4>1. Schedule Pickup</h4>
                <p>Fill out the form with your waste details and preferred pickup time.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="step-content">
                <h4>2. We Collect</h4>
                <p>Our team will arrive at your location on the scheduled date and time.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-icon">
                <FaRecycle />
              </div>
              <div className="step-content">
                <h4>3. Earn Points</h4>
                <p>Get 15 points for each pickup, which you can redeem for rewards.</p>
              </div>
            </div>
          </div>

          <div className="waste-guidelines">
            <h3>Waste Guidelines</h3>
            <ul>
              <li>Clean and sort your recyclables</li>
              <li>Remove any food residue</li>
              <li>Separate different types of waste</li>
              <li>Minimum pickup: 1kg</li>
              <li>Maximum pickup: 100kg</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pickup; 