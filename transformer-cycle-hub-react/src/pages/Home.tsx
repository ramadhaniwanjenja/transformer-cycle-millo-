import React from 'react';
import { Link } from 'react-router-dom';
import { FaRecycle, FaGraduationCap, FaGift, FaMapMarkerAlt } from 'react-icons/fa';
import CommunityMap from '../components/CommunityMap';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Transforming Waste, Building Communities</h1>
          <p>Your hub for sustainable living in Kenya. Recycle, Upcycle, Earn Rewards!</p>
          <Link to="/login" className="btn">Join Us Today</Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="home-grid">
        <div className="home-card">
          <div className="card-icon">
            <FaRecycle />
          </div>
          <h3>Schedule a Waste Pickup</h3>
          <p>Easily request pickups for your plastic, e-waste, and bottles. We make recycling convenient!</p>
          <Link to="/pickup" className="btn">Learn More</Link>
        </div>

        <div className="home-card">
          <div className="card-icon">
            <FaGraduationCap />
          </div>
          <h3>Upcycling Tutorials</h3>
          <p>Discover creative ways to transform your waste into valuable items and reduce landfill burden.</p>
          <Link to="/tutorials" className="btn">Start Learning</Link>
        </div>

        <div className="home-card">
          <div className="card-icon">
            <FaGift />
          </div>
          <h3>Earn Green Rewards</h3>
          <p>Get rewarded with points for every eco-friendly action you take on our platform.</p>
          <Link to="/rewards" className="btn">See Rewards</Link>
        </div>
      </section>

      {/* Community Map Section */}
      <section className="community-map-section card">
        <div className="map-header">
          <div className="map-icon">
            <FaMapMarkerAlt />
          </div>
          <div>
            <h2>Community Map</h2>
            <p>Find nearby recycling centers, waste collection points, and eco-partners in your community.</p>
            <p>Use the map to locate the best places for your waste and discover local green initiatives.</p>
          </div>
        </div>
        <CommunityMap />
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">1,500+</div>
            <div className="stat-label">Users Joined</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5,000+</div>
            <div className="stat-label">Waste Pickups</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">25+</div>
            <div className="stat-label">Recycling Centers</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50,000+</div>
            <div className="stat-label">Points Earned</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Make a Difference?</h2>
          <p>Join thousands of Kenyans who are already transforming waste into opportunities.</p>
          <div className="cta-buttons">
            <Link to="/login" className="btn">Get Started</Link>
            <Link to="/about" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 