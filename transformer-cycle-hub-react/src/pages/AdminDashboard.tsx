import React from 'react';
import { FaUsers, FaRecycle, FaChartBar, FaCog } from 'react-icons/fa';

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-header card">
        <h1>Admin Dashboard</h1>
        <p>Manage the Transformer Cycle Hub platform</p>
      </div>
      
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p className="stat-number">1,500</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaRecycle />
          </div>
          <div className="stat-info">
            <h3>Pickups Today</h3>
            <p className="stat-number">45</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaChartBar />
          </div>
          <div className="stat-info">
            <h3>Waste Processed</h3>
            <p className="stat-number">2.5 tons</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaCog />
          </div>
          <div className="stat-info">
            <h3>Active Centers</h3>
            <p className="stat-number">25</p>
          </div>
        </div>
      </div>
      
      <div className="admin-content">
        <div className="admin-section card">
          <h2>Recent Pickup Requests</h2>
          <div className="pickup-list">
            <div className="pickup-item">
              <div className="pickup-info">
                <h4>Plastic Waste - John Doe</h4>
                <p>15kg • Nairobi • Pending</p>
              </div>
              <div className="pickup-actions">
                <button className="btn">Approve</button>
                <button className="btn btn-secondary">Reject</button>
              </div>
            </div>
            
            <div className="pickup-item">
              <div className="pickup-info">
                <h4>E-Waste - Jane Smith</h4>
                <p>8kg • Mombasa • Approved</p>
              </div>
              <div className="pickup-actions">
                <button className="btn">Complete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 