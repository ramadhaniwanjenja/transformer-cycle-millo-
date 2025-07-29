import React from 'react';
import { FaRecycle, FaUsers, FaLeaf, FaHandshake } from 'react-icons/fa';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About Transformer Cycle Hub</h1>
          <p>Transforming waste into opportunities, one community at a time.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section card">
        <div className="mission-content">
          <div className="mission-text">
            <h2>Our Mission</h2>
            <p>
              At Transformer Cycle Hub, we believe that waste is not just a problem to be solved, 
              but an opportunity to be seized. Our mission is to create a sustainable ecosystem 
              where communities can transform their waste into valuable resources while earning 
              rewards for their environmental efforts.
            </p>
            <p>
              We connect individuals, businesses, and recycling centers across Kenya to create 
              a circular economy that benefits everyone. Through education, technology, and 
              community engagement, we're building a greener future for Kenya.
            </p>
          </div>
          <div className="mission-stats">
            <div className="stat-item">
              <div className="stat-number">1,500+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Recycling Centers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5,000+</div>
              <div className="stat-label">Waste Pickups</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Points Earned</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <FaRecycle />
            </div>
            <h3>Sustainability</h3>
            <p>
              We promote sustainable practices that reduce environmental impact and 
              create long-term value for communities.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <FaUsers />
            </div>
            <h3>Community</h3>
            <p>
              We believe in the power of community to drive change and create 
              meaningful impact together.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <FaLeaf />
            </div>
            <h3>Innovation</h3>
            <p>
              We continuously innovate to find new ways to transform waste into 
              valuable resources and opportunities.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <FaHandshake />
            </div>
            <h3>Partnership</h3>
            <p>
              We build strong partnerships with recycling centers, businesses, 
              and communities to create a circular economy.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section card">
        <div className="story-content">
          <div className="story-text">
            <h2>Our Story</h2>
            <p>
              Transformer Cycle Hub was born from a simple observation: waste management 
              in Kenya was fragmented, inefficient, and lacked incentives for individuals 
              to participate actively in recycling efforts.
            </p>
            <p>
              Founded in 2023, our platform was created to bridge the gap between 
              waste generators and recycling facilities, while providing education and 
              rewards to encourage sustainable behavior.
            </p>
            <p>
              Today, we're proud to serve communities across Kenya, helping thousands 
              of people turn their waste into opportunities while contributing to a 
              cleaner, more sustainable environment.
            </p>
          </div>
          <div className="story-image">
            <div className="image-placeholder">
              <FaLeaf />
              <p>Community Impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">
              <FaUsers />
            </div>
            <h3>Environmental Experts</h3>
            <p>Our team includes environmental scientists and waste management specialists.</p>
          </div>

          <div className="team-member">
            <div className="member-avatar">
              <FaRecycle />
            </div>
            <h3>Technology Innovators</h3>
            <p>Software engineers and designers creating user-friendly solutions.</p>
          </div>

          <div className="team-member">
            <div className="member-avatar">
              <FaHandshake />
            </div>
            <h3>Community Leaders</h3>
            <p>Local leaders and activists driving community engagement and education.</p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section card">
        <h2>Our Impact</h2>
        <div className="impact-grid">
          <div className="impact-item">
            <h3>Environmental Impact</h3>
            <ul>
              <li>Reduced landfill waste by 30% in served communities</li>
              <li>Diverted over 100 tons of recyclable materials</li>
              <li>Prevented 50+ tons of CO2 emissions</li>
              <li>Created 25+ green jobs in local communities</li>
            </ul>
          </div>

          <div className="impact-item">
            <h3>Social Impact</h3>
            <ul>
              <li>Educated 2,000+ people on waste management</li>
              <li>Distributed 500+ eco-friendly rewards</li>
              <li>Connected 25+ recycling centers</li>
              <li>Built 5 community recycling programs</li>
            </ul>
          </div>

          <div className="impact-item">
            <h3>Economic Impact</h3>
            <ul>
              <li>Generated 500,000+ points in rewards</li>
              <li>Created local recycling businesses</li>
              <li>Reduced waste collection costs by 20%</li>
              <li>Increased recycling center efficiency by 40%</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <div className="cta-content">
          <h2>Join Our Mission</h2>
          <p>Be part of the transformation. Start recycling, earning rewards, and making a difference today.</p>
          <div className="cta-buttons">
            <a href="/login" className="btn">Get Started</a>
            <a href="/contact" className="btn btn-secondary">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 