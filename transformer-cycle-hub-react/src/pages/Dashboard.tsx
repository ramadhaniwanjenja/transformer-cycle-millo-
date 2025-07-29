import React from 'react';
import { FaChartBar, FaRecycle, FaTrophy } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header card">
        <h1>Welcome to Your Dashboard</h1>
        <p>Track your recycling progress and earn rewards</p>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaRecycle />
          </div>
          <div className="stat-info">
            <h3>Total Pickups</h3>
            <p className="stat-number">15</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaTrophy />
          </div>
          <div className="stat-info">
            <h3>Points Earned</h3>
            <p className="stat-number">225</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaChartBar />
          </div>
          <div className="stat-info">
            <h3>Waste Recycled</h3>
            <p className="stat-number">45kg</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="recent-activity card">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">
                <FaRecycle />
              </div>
              <div className="activity-info">
                <h4>Plastic Waste Pickup</h4>
                <p>Completed on January 15, 2025</p>
                <span className="points-earned">+15 points</span>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon">
                <FaTrophy />
              </div>
              <div className="activity-info">
                <h4>Tutorial Completed</h4>
                <p>DIY Plastic Bottle Plant Pots</p>
                <span className="points-earned">+10 points</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 