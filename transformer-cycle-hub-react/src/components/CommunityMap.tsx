import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPhone, FaGlobe } from 'react-icons/fa';
import './CommunityMap.css';

interface RecyclingCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  website?: string;
  lat: number;
  lng: number;
  type: 'recycling' | 'collection' | 'eco-partner';
}

const CommunityMap: React.FC = () => {
  const [centers, setCenters] = useState<RecyclingCenter[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<RecyclingCenter | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Sample recycling centers data
  const recyclingCenters: RecyclingCenter[] = [
    {
      id: '1',
      name: 'Nairobi Recycling Center',
      address: 'CBD, Nairobi',
      phone: '+254 700 123 456',
      website: 'https://nairobi-recycling.com',
      lat: -1.2921,
      lng: 36.8219,
      type: 'recycling'
    },
    {
      id: '2',
      name: 'Eastlands Waste Management',
      address: 'Eastlands, Nairobi',
      phone: '+254 700 234 567',
      lat: -1.2850,
      lng: 36.8500,
      type: 'collection'
    },
    {
      id: '3',
      name: 'Westlands Green Hub',
      address: 'Westlands, Nairobi',
      phone: '+254 700 345 678',
      website: 'https://westlands-green.com',
      lat: -1.2600,
      lng: 36.8000,
      type: 'recycling'
    },
    {
      id: '4',
      name: 'Karen Eco Center',
      address: 'Karen, Nairobi',
      phone: '+254 700 456 789',
      lat: -1.3200,
      lng: 36.7000,
      type: 'eco-partner'
    },
    {
      id: '5',
      name: 'Mombasa Recycling Hub',
      address: 'Mombasa, Coast',
      phone: '+254 700 567 890',
      lat: -4.0435,
      lng: 39.6682,
      type: 'recycling'
    }
  ];

  useEffect(() => {
    setCenters(recyclingCenters);
    setMapLoaded(true);
  }, []);

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'recycling':
        return '#2E8B57';
      case 'collection':
        return '#FF6B35';
      case 'eco-partner':
        return '#6A4C93';
      default:
        return '#2E8B57';
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'recycling':
        return '♻️';
      case 'collection':
        return '🗑️';
      case 'eco-partner':
        return '🌱';
      default:
        return '📍';
    }
  };

  return (
    <div className="community-map">
      <div className="map-container">
        {!mapLoaded ? (
          <div className="map-loading">
            <div className="loading-spinner"></div>
            <p>Loading recycling centers map...</p>
          </div>
        ) : (
          <div className="map-fallback">
            <div className="map-overlay">
              <h3>Recycling Centers Map</h3>
              <p>Interactive map showing recycling centers across Kenya</p>
            </div>
            <div className="map-markers">
              {centers.map((center) => (
                <div
                  key={center.id}
                  className={`map-marker ${selectedCenter?.id === center.id ? 'active' : ''}`}
                  style={{
                    left: `${((center.lng + 2) / 4) * 100}%`,
                    top: `${((center.lat + 2) / 4) * 100}%`,
                    backgroundColor: getMarkerColor(center.type)
                  }}
                  onClick={() => setSelectedCenter(center)}
                >
                  <span className="marker-icon">{getMarkerIcon(center.type)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="centers-list">
        <h3>Recycling Centers</h3>
        <div className="centers-grid">
          {centers.map((center) => (
            <div
              key={center.id}
              className={`center-card ${selectedCenter?.id === center.id ? 'active' : ''}`}
              onClick={() => setSelectedCenter(center)}
            >
              <div className="center-header">
                <div className="center-icon" style={{ backgroundColor: getMarkerColor(center.type) }}>
                  {getMarkerIcon(center.type)}
                </div>
                <div className="center-info">
                  <h4>{center.name}</h4>
                  <p className="center-address">
                    <FaMapMarkerAlt /> {center.address}
                  </p>
                </div>
              </div>
              <div className="center-contact">
                <p className="center-phone">
                  <FaPhone /> {center.phone}
                </p>
                {center.website && (
                  <p className="center-website">
                    <FaGlobe /> <a href={center.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCenter && (
        <div className="center-details">
          <div className="details-header">
            <h3>{selectedCenter.name}</h3>
            <button 
              className="close-btn"
              onClick={() => setSelectedCenter(null)}
            >
              ×
            </button>
          </div>
          <div className="details-content">
            <p><FaMapMarkerAlt /> {selectedCenter.address}</p>
            <p><FaPhone /> {selectedCenter.phone}</p>
            {selectedCenter.website && (
              <p><FaGlobe /> <a href={selectedCenter.website} target="_blank" rel="noopener noreferrer">
                {selectedCenter.website}
              </a></p>
            )}
            <div className="center-type">
              <span className={`type-badge ${selectedCenter.type}`}>
                {selectedCenter.type.charAt(0).toUpperCase() + selectedCenter.type.slice(1)} Center
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityMap; 