import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChartBar, FaRecycle, FaTrophy, FaCalendarAlt, FaArrowRight, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { pickupsAPI, rewardsAPI } from '../services/api';
import './Dashboard.css';

interface Pickup {
  _id: string;
  wasteType: string;
  quantity: number;
  pickupDate: string;
  pickupTime: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  pointsEarned?: number;
}

const Dashboard: React.FC = () => {
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [stats, setStats] = useState({
    totalPickups: 0,
    totalPoints: 0,
    totalWeight: 0
  });

  useEffect(() => {
    fetchUserData();
    fetchUserPickups();
    fetchUserPoints();
  }, []);

  const fetchUserData = () => {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      try {
        const user = JSON.parse(userDataStr);
        setUserData(user);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  };

  const fetchUserPickups = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await pickupsAPI.getMyPickups();

      if (response.data.success) {
        setPickups(response.data.data);
        
        // Calculate stats
        const totalPickups = response.data.data.length;
        const totalPoints = response.data.data.reduce((sum: number, pickup: Pickup) => sum + (pickup.pointsEarned || 0), 0);
        const totalWeight = response.data.data.reduce((sum: number, pickup: Pickup) => sum + pickup.quantity, 0);
        
        setStats({
          totalPickups,
          totalPoints,
          totalWeight
        });
      }
    } catch (error) {
      console.error('Error fetching pickups:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPoints = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.log('No access token found');
        return;
      }

      console.log('Fetching user points with token:', token.substring(0, 20) + '...');
      
      const response = await rewardsAPI.getMyRewards();

      console.log('Points response:', response.data);

      if (response.data.success) {
        setStats(prevStats => ({
          ...prevStats,
          totalPoints: response.data.data.pointsBalance
        }));
      }
    } catch (error: any) {
      console.error('Error fetching user points:', error.response?.data || error.message);
    }
  };

  // Listen for tutorial completion events
  useEffect(() => {
    const handleTutorialComplete = () => {
      fetchUserPickups();
      fetchUserPoints();
    };

    window.addEventListener('tutorialCompleted', handleTutorialComplete);
    return () => {
      window.removeEventListener('tutorialCompleted', handleTutorialComplete);
    };
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <FaClock className="status-icon pending" />;
      case 'approved':
        return <FaCheckCircle className="status-icon approved" />;
      case 'completed':
        return <FaCheckCircle className="status-icon completed" />;
      case 'rejected':
        return <FaTimesCircle className="status-icon rejected" />;
      default:
        return <FaClock className="status-icon pending" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending Approval';
      case 'approved':
        return 'Approved';
      case 'completed':
        return 'Completed';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header card">
        <h1>Welcome, {userData ? `${userData.firstName} ${userData.lastName}` : 'User'}!</h1>
        <p>Track your recycling progress and earn rewards</p>
        <div className="points-display">
          <span className="points-label">Your Green Points:</span>
          <span className="points-value">{stats.totalPoints}</span>
          <button 
            onClick={fetchUserPoints}
            style={{ 
              background: 'rgba(255,255,255,0.2)', 
              border: 'none', 
              color: 'white', 
              padding: '5px 10px', 
              borderRadius: '5px',
              marginLeft: '10px',
              cursor: 'pointer'
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>
      
      {/* Quick Actions Section */}
      <div className="quick-actions card">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/pickup" className="action-btn primary">
            <FaCalendarAlt />
            <span>Schedule New Pickup</span>
            <FaArrowRight />
          </Link>
          <Link to="/tutorials" className="action-btn secondary">
            <FaRecycle />
            <span>View Tutorials</span>
            <FaArrowRight />
          </Link>
          <Link to="/rewards" className="action-btn secondary">
            <FaTrophy />
            <span>Redeem Rewards</span>
            <FaArrowRight />
          </Link>
        </div>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaRecycle />
          </div>
          <div className="stat-info">
            <h3>Total Pickups</h3>
            <p className="stat-number">{stats.totalPickups}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaTrophy />
          </div>
          <div className="stat-info">
            <h3>Points Earned</h3>
            <p className="stat-number">{stats.totalPoints}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaChartBar />
          </div>
          <div className="stat-info">
            <h3>Waste Recycled</h3>
            <p className="stat-number">{stats.totalWeight.toFixed(1)}kg</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="recent-activity card">
          <h2>Recent Pickup Requests</h2>
          {loading ? (
            <div className="loading">Loading your pickup requests...</div>
          ) : pickups.length === 0 ? (
            <div className="no-pickups">
              <p>No pickup requests yet. Schedule your first pickup to get started!</p>
              <Link to="/pickup" className="btn">Schedule Pickup</Link>
            </div>
          ) : (
            <div className="pickup-list">
              {pickups.slice(0, 5).map((pickup) => (
                <div key={pickup._id} className="pickup-item">
                  <div className="pickup-header">
                    {getStatusIcon(pickup.status)}
                    <div className="pickup-info">
                      <h4>{pickup.wasteType.charAt(0).toUpperCase() + pickup.wasteType.slice(1)} Waste</h4>
                      <p>{pickup.quantity}kg • {formatDate(pickup.pickupDate)} • {pickup.pickupTime}</p>
                    </div>
                    <span className={`status-badge ${pickup.status}`}>
                      {getStatusText(pickup.status)}
                    </span>
                  </div>
                  <div className="pickup-details">
                    <p><strong>Address:</strong> {pickup.address}</p>
                    {pickup.pointsEarned && (
                      <p className="points-earned">+{pickup.pointsEarned} points earned</p>
                    )}
              </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 