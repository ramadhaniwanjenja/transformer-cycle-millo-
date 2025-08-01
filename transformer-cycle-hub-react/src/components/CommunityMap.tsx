import React, { useState, useEffect } from 'react';
import { recyclingCentersAPI } from '../services/api';
import { FaMapMarkerAlt, FaPhone, FaGlobe, FaStar, FaFilter, FaSearch } from 'react-icons/fa';
import './CommunityMap.css';

interface RecyclingCenter {
  _id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  website: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: string;
  services: string[];
  operatingHours: {
    [key: string]: { open: string; close: string };
  };
  rating: number;
  reviews: Array<{
    rating: number;
    comment: string;
    createdAt: string;
  }>;
}

const CommunityMap: React.FC = () => {
  const [centers, setCenters] = useState<RecyclingCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCenter, setSelectedCenter] = useState<RecyclingCenter | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [filterType, setFilterType] = useState('');
  const [filterService, setFilterService] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCenters();
    getUserLocation();
  }, [filterType, filterService, userLocation]);

  const fetchCenters = async () => {
    try {
      const params = new URLSearchParams();
      if (filterType) params.append('type', filterType);
      if (filterService) params.append('service', filterService);
      if (userLocation) {
        params.append('lat', userLocation.lat.toString());
        params.append('lng', userLocation.lng.toString());
        params.append('radius', '10000'); // 10km radius
      }

      const response = await recyclingCentersAPI.getAll();
      if (response.data.success) {
        setCenters(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching recycling centers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Error getting location:', error);
          // Default to Nairobi coordinates
          setUserLocation({ lat: -1.2921, lng: 36.8219 });
        }
      );
    } else {
      // Default to Nairobi coordinates
      setUserLocation({ lat: -1.2921, lng: 36.8219 });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recycling-center': return '🏭';
      case 'eco-partner': return '🤝';
      case 'drop-off-point': return '📦';
      case 'composting-site': return '🌱';
      default: return '📍';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'recycling-center': return '#4CAF50';
      case 'eco-partner': return '#2196F3';
      case 'drop-off-point': return '#FF9800';
      case 'composting-site': return '#8BC34A';
      default: return '#666';
    }
  };

  const filteredCenters = centers.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || center.type === filterType;
    const matchesService = !filterService || center.services.includes(filterService);
    return matchesSearch && matchesType && matchesService;
  });

  const centerTypes = [
    { value: '', label: 'All Types' },
    { value: 'recycling-center', label: 'Recycling Centers' },
    { value: 'eco-partner', label: 'Eco Partners' },
    { value: 'drop-off-point', label: 'Drop-off Points' },
    { value: 'composting-site', label: 'Composting Sites' }
  ];

  const serviceTypes = [
    { value: '', label: 'All Services' },
    { value: 'plastic', label: 'Plastic' },
    { value: 'paper', label: 'Paper' },
    { value: 'glass', label: 'Glass' },
    { value: 'metal', label: 'Metal' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'textiles', label: 'Textiles' },
    { value: 'batteries', label: 'Batteries' },
    { value: 'composting', label: 'Composting' }
  ];

  return (
    <div className="community-map-page">
      <div className="map-header">
        <h1>🗺️ Community Recycling Map</h1>
        <p>Find nearby recycling centers and eco-partners in your area</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="map-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search centers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <FaFilter className="filter-icon" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {centerTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
            >
              {serviceTypes.map(service => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>

          <button 
            className="refresh-btn"
            onClick={fetchCenters}
            title="Refresh centers"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="map-container">
        {loading ? (
          <div className="loading">Loading recycling centers...</div>
        ) : (
          <div className="map-content">
            {/* Map Placeholder - In real app, integrate with Google Maps or Leaflet */}
            <div className="map-placeholder">
              <div className="map-overlay">
                <h3>🗺️ Interactive Map</h3>
                <p>Map integration would show {filteredCenters.length} centers near you</p>
                <p>Coordinates: {userLocation ? `${userLocation.lat}, ${userLocation.lng}` : 'Loading...'}</p>
              </div>
            </div>

            {/* Centers List */}
            <div className="centers-list">
              <h3>📍 Nearby Centers ({filteredCenters.length})</h3>
              
              {filteredCenters.length === 0 ? (
                <div className="no-centers">
                  <p>No recycling centers found in your area.</p>
                  <p>Try adjusting your filters or expanding the search radius.</p>
                </div>
              ) : (
                <div className="centers-grid">
                  {filteredCenters.map((center) => (
                    <div 
                      key={center._id} 
                      className="center-card"
                      onClick={() => setSelectedCenter(center)}
                    >
                      <div className="center-header">
                        <span className="center-icon" style={{ color: getTypeColor(center.type) }}>
                          {getTypeIcon(center.type)}
                        </span>
                        <div className="center-rating">
                          <FaStar /> {center.rating.toFixed(1)}
                        </div>
                      </div>

                      <div className="center-info">
                        <h4>{center.name}</h4>
                        <p className="center-description">{center.description}</p>
                        <p className="center-address">
                          <FaMapMarkerAlt /> {center.address}
                        </p>
                        
                        <div className="center-services">
                          {center.services.map(service => (
                            <span key={service} className="service-tag">
                              {service}
                            </span>
                          ))}
                        </div>

                        <div className="center-actions">
                          <button className="btn contact-btn">
                            <FaPhone /> {center.phone}
                          </button>
                          {center.website && (
                            <button className="btn website-btn">
                              <FaGlobe /> Website
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Center Details Modal */}
      {selectedCenter && (
        <div className="center-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedCenter.name}</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedCenter(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="center-details">
                <p><strong>Type:</strong> {selectedCenter.type.replace('-', ' ')}</p>
                <p><strong>Address:</strong> {selectedCenter.address}</p>
                <p><strong>Phone:</strong> {selectedCenter.phone}</p>
                {selectedCenter.website && (
                  <p><strong>Website:</strong> <a href={selectedCenter.website} target="_blank" rel="noopener noreferrer">{selectedCenter.website}</a></p>
                )}
                <p><strong>Rating:</strong> <FaStar /> {selectedCenter.rating.toFixed(1)}</p>
                
                <div className="services-section">
                  <h4>Services Offered:</h4>
                  <div className="services-list">
                    {selectedCenter.services.map(service => (
                      <span key={service} className="service-badge">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hours-section">
                  <h4>Operating Hours:</h4>
                  <div className="hours-grid">
                    {Object.entries(selectedCenter.operatingHours).map(([day, hours]) => (
                      <div key={day} className="hour-item">
                        <span className="day">{day.charAt(0).toUpperCase() + day.slice(1)}:</span>
                        <span className="hours">{hours.open} - {hours.close}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="btn contact-btn"
                onClick={() => window.open(`tel:${selectedCenter.phone}`)}
              >
                <FaPhone /> Call Now
              </button>
              {selectedCenter.website && (
                <button 
                  className="btn website-btn"
                  onClick={() => window.open(selectedCenter.website, '_blank')}
                >
                  <FaGlobe /> Visit Website
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityMap; 