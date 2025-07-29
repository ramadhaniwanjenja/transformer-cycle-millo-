import React from 'react';
import { FaGift, FaTrophy } from 'react-icons/fa';

const Rewards: React.FC = () => {
  return (
    <div className="rewards-page">
      <div className="card">
        <h1>Rewards & Leaderboard</h1>
        <p>Earn points for eco-friendly actions and redeem them for amazing rewards!</p>
      </div>
      
      <div className="rewards-grid">
        <div className="reward-card">
          <div className="reward-icon">
            <FaGift />
          </div>
          <h3>Eco-friendly Water Bottle</h3>
          <p>100 Points</p>
          <button className="btn">Redeem</button>
        </div>
        
        <div className="reward-card">
          <div className="reward-icon">
            <FaGift />
          </div>
          <h3>Reusable Shopping Bag</h3>
          <p>250 Points</p>
          <button className="btn">Redeem</button>
        </div>
        
        <div className="reward-card">
          <div className="reward-icon">
            <FaGift />
          </div>
          <h3>Solar Phone Charger</h3>
          <p>500 Points</p>
          <button className="btn">Redeem</button>
        </div>
      </div>
    </div>
  );
};

export default Rewards; 