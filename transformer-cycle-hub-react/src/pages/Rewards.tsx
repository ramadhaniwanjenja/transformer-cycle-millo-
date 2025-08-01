import React, { useState, useEffect } from 'react';

import { FaGift, FaStar, FaTimes, FaFilter, FaSearch } from 'react-icons/fa';
import { rewardsAPI } from '../services/api';
import './Rewards.css';

interface Reward {
  _id: string;
  name: string;
  description: string;
  pointsRequired: number;
  category: string;
  imageUrl: string;
  stock: number;
}

interface UserReward {
  _id: string;
  reward: Reward;
  pointsSpent: number;
  redeemedAt: string;
  status: string;
}

const Rewards: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [userRewards, setUserRewards] = useState<UserReward[]>([]);
  const [pointsBalance, setPointsBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [redeeming, setRedeeming] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    phone: '',
    notes: ''
  });

  useEffect(() => {
    fetchRewards();
    fetchUserRewards();
    
    // Listen for tutorial completion events
    const handleTutorialComplete = () => {
      fetchUserRewards(); // Refresh points balance
    };

    window.addEventListener('tutorialCompleted', handleTutorialComplete);
    return () => {
      window.removeEventListener('tutorialCompleted', handleTutorialComplete);
    };
  }, []);

  const fetchRewards = async () => {
    try {
      const response = await rewardsAPI.getAll();
      if (response.data.success) {
        setRewards(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRewards = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.log('No access token found for rewards');
        return;
      }

      console.log('Fetching user rewards with token:', token.substring(0, 20) + '...');

      const response = await rewardsAPI.getAll();

      console.log('Rewards response:', response.data);

      if (response.data.success) {
        setPointsBalance(response.data.data.pointsBalance);
        setUserRewards(response.data.data.rewards);
      }
    } catch (error: any) {
      console.error('Error fetching user rewards:', error.response?.data || error.message);
    }
  };

  const handleRedeem = async () => {
    if (!selectedReward) return;

    try {
      setRedeeming(true);
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await rewardsAPI.redeemReward(selectedReward._id, deliveryDetails);

      if (response.data.success) {
        alert('🎉 Reward redeemed successfully! Check your email for confirmation.');
        setShowRedeemModal(false);
        setSelectedReward(null);
        setDeliveryDetails({ address: '', phone: '', notes: '' });
        fetchUserRewards(); // Refresh points balance
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error redeeming reward');
    } finally {
      setRedeeming(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'eco-friendly': return '🌱';
      case 'gift-card': return '💳';
      case 'merchandise': return '👕';
      case 'experience': return '🎯';
      default: return '🎁';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#ff9800';
      case 'approved': return '#4caf50';
      case 'delivered': return '#2196f3';
      case 'cancelled': return '#f44336';
      default: return '#666';
    }
  };

  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reward.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || reward.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'eco-friendly', label: 'Eco-Friendly', icon: '🌱' },
    { value: 'gift-card', label: 'Gift Cards', icon: '💳' },
    { value: 'merchandise', label: 'Merchandise', icon: '👕' },
    { value: 'experience', label: 'Experiences', icon: '🎯' }
  ];

  return (
    <div className="rewards-page">
      <div className="rewards-header">
        <h1>🎁 Rewards Center</h1>
        <p>Redeem your green points for amazing eco-friendly rewards!</p>
      </div>

      {/* Points Balance */}
      <div className="points-balance">
        <div className="balance-card">
          <FaStar className="balance-icon" />
          <div className="balance-info">
            <h2>{pointsBalance}</h2>
            <p>Green Points Available</p>
          </div>
          <button 
            className="refresh-btn"
            onClick={fetchUserRewards}
            title="Refresh points balance"
          >
            🔄
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="rewards-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search rewards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <FaFilter className="filter-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.icon} {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <div className="rewards-section">
        <h2>Available Rewards</h2>
        {loading ? (
          <div className="loading">Loading rewards...</div>
        ) : (
          <div className="rewards-grid">
            {filteredRewards.map((reward) => (
              <div key={reward._id} className={`reward-card ${pointsBalance >= reward.pointsRequired ? 'affordable' : 'expensive'}`}>
                <div className="reward-header">
                  <span className="category-icon">{getCategoryIcon(reward.category)}</span>
                  <div className="points-required">
                    <FaStar /> {reward.pointsRequired} pts
                  </div>
                </div>

                <div className="reward-content">
                  <h3>{reward.name}</h3>
                  <p>{reward.description}</p>
                  
                  {reward.stock !== -1 && (
                    <div className="stock-info">
                      {reward.stock > 0 ? `${reward.stock} left` : 'Out of stock'}
                    </div>
                  )}
                </div>

                <div className="reward-actions">
                  {pointsBalance >= reward.pointsRequired ? (
                    <button
                      className="btn redeem-btn"
                      onClick={() => {
                        setSelectedReward(reward);
                        setShowRedeemModal(true);
                      }}
                      disabled={reward.stock === 0}
                    >
                      <FaGift /> Redeem
                    </button>
                  ) : (
                    <div className="insufficient-points">
                      Need {reward.pointsRequired - pointsBalance} more points
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User's Reward History */}
      {userRewards.length > 0 && (
        <div className="rewards-section">
          <h2>My Reward History</h2>
          <div className="reward-history">
            {userRewards.map((userReward) => (
              <div key={userReward._id} className="history-item">
                <div className="history-info">
                  <h4>{userReward.reward.name}</h4>
                  <p>Redeemed for {userReward.pointsSpent} points</p>
                  <p className="redeem-date">
                    {new Date(userReward.redeemedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="status-badge" style={{ backgroundColor: getStatusColor(userReward.status) }}>
                  {userReward.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Redeem Modal */}
      {showRedeemModal && selectedReward && (
        <div className="redeem-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Redeem: {selectedReward.name}</h2>
              <button 
                className="close-btn"
                onClick={() => setShowRedeemModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="reward-summary">
                <p><strong>Points Required:</strong> {selectedReward.pointsRequired}</p>
                <p><strong>Your Balance:</strong> {pointsBalance}</p>
                <p><strong>Points After Redemption:</strong> {pointsBalance - selectedReward.pointsRequired}</p>
              </div>

              <div className="delivery-form">
                <h3>Delivery Details</h3>
                <div className="form-group">
                  <label>Address:</label>
                  <input
                    type="text"
                    value={deliveryDetails.address}
                    onChange={(e) => setDeliveryDetails({...deliveryDetails, address: e.target.value})}
                    placeholder="Enter your delivery address"
                  />
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    value={deliveryDetails.phone}
                    onChange={(e) => setDeliveryDetails({...deliveryDetails, phone: e.target.value})}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label>Notes (Optional):</label>
                  <textarea
                    value={deliveryDetails.notes}
                    onChange={(e) => setDeliveryDetails({...deliveryDetails, notes: e.target.value})}
                    placeholder="Any special instructions..."
                  />
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="btn cancel-btn"
                onClick={() => setShowRedeemModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn confirm-btn"
                onClick={handleRedeem}
                disabled={redeeming || !deliveryDetails.address || !deliveryDetails.phone}
              >
                {redeeming ? 'Redeeming...' : 'Confirm Redemption'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rewards; 