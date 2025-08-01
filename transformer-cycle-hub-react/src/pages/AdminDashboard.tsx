import React, { useState, useEffect } from 'react';
import { FaUsers, FaRecycle, FaChartBar, FaCog, FaCheck, FaTimes } from 'react-icons/fa';
import { pickupsAPI, usersAPI } from '../services/api';
import './AdminDashboard.css';

interface Pickup {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  wasteType: string;
  quantity: number;
  pickupDate: string;
  pickupTime: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  notes?: string;
}

const AdminDashboard: React.FC = () => {
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingPickups: 0,
    totalWeight: 0,
    activeCenters: 25
  });
  const [selectedPickup, setSelectedPickup] = useState<Pickup | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    console.log('AdminDashboard mounted');
    try {
      fetchPickups();
      fetchStats();
    } catch (error) {
      console.error('Error in AdminDashboard useEffect:', error);
      setError('Failed to load admin dashboard');
    }
  }, []);

  const fetchPickups = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.log('No access token found for pickups');
        return;
      }

      console.log('Fetching admin pickups...');

      // Fetch all pickups, not just pending ones
      const response = await pickupsAPI.getAll();
      console.log('Pickups response:', response.data);

      if (response.data.success) {
        setPickups(response.data.data.pickups || response.data.data || []);
      } else {
        console.log('Pickups response not successful:', response.data);
        setPickups([]);
      }
    } catch (error) {
      console.error('Error fetching pickups:', error);
      setPickups([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.log('No access token found for stats');
        return;
      }

      console.log('Fetching admin stats...');

      // Fetch pickup stats
      const pickupResponse = await pickupsAPI.getStats();
      console.log('Pickup stats response:', pickupResponse.data);

      // Fetch user stats
      const userResponse = await usersAPI.getStats();
      console.log('User stats response:', userResponse.data);

      if (pickupResponse.data.success && userResponse.data.success) {
        const pickupStats = pickupResponse.data.data;
        const userStats = userResponse.data.data;
        
        setStats({
          totalUsers: userStats.totalUsers || 0,
          pendingPickups: pickupStats.byStatus?.find((s: any) => s._id === 'pending')?.count || 0,
          totalWeight: pickupStats.totalWeight || 0,
          activeCenters: 25
        });
      } else {
        console.log('Stats responses not successful:', { pickupResponse, userResponse });
        // Set default stats if API calls fail
        setStats({
          totalUsers: 0,
          pendingPickups: 0,
          totalWeight: 0,
          activeCenters: 25
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default stats on error
      setStats({
        totalUsers: 0,
        pendingPickups: 0,
        totalWeight: 0,
        activeCenters: 25
      });
    }
  };

  const handleApprove = async (pickupId: string) => {
    setActionLoading(pickupId);
    try {
      const response = await pickupsAPI.approve(pickupId, { adminNotes });

      if (response.data.success) {
        alert('Pickup approved successfully!');
        fetchPickups();
        setSelectedPickup(null);
        setAdminNotes('');
      }
    } catch (error) {
      console.error('Error approving pickup:', error);
      alert('Failed to approve pickup');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (pickupId: string) => {
    if (!adminNotes.trim()) {
      alert('Please provide admin notes when rejecting a pickup');
      return;
    }

    setActionLoading(pickupId);
    try {
      const response = await pickupsAPI.reject(pickupId, { adminNotes });

      if (response.data.success) {
        alert('Pickup rejected successfully!');
        fetchPickups();
        setSelectedPickup(null);
        setAdminNotes('');
      }
    } catch (error) {
      console.error('Error rejecting pickup:', error);
      alert('Failed to reject pickup');
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="admin-header card">
          <h1>Admin Dashboard</h1>
          <p style={{ color: 'red' }}>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="admin-header card">
          <h1>Admin Dashboard</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  console.log('AdminDashboard rendering with:', { loading, error, stats, pickups: pickups.length });

  return (
    <div className="admin-dashboard">
      <div className="admin-header card">
        <h1>Admin Dashboard</h1>
        <p>Manage the Transformer Cycle Hub platform</p>
        <p>Debug: {loading ? 'Loading' : 'Loaded'} | {error ? 'Error' : 'No Error'}</p>
      </div>
      
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p className="stat-number">{stats.totalUsers}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaRecycle />
          </div>
          <div className="stat-info">
            <h3>Pending Pickups</h3>
            <p className="stat-number">{stats.pendingPickups}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaChartBar />
          </div>
          <div className="stat-info">
            <h3>Waste Processed</h3>
            <p className="stat-number">{stats.totalWeight.toFixed(1)} tons</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaCog />
          </div>
          <div className="stat-info">
            <h3>Active Centers</h3>
            <p className="stat-number">{stats.activeCenters}</p>
          </div>
        </div>
      </div>
      
      <div className="admin-content">
        <div className="admin-section card">
          <h2>All Pickup Requests</h2>
          {loading ? (
            <div className="loading">Loading pickup requests...</div>
          ) : pickups.length === 0 ? (
            <div className="no-pickups">
              <p>No pickup requests at the moment.</p>
            </div>
          ) : (
          <div className="pickup-list">
              {pickups.map((pickup) => (
                <div key={pickup._id} className={`pickup-item ${pickup.status}`}>
                  <div className="pickup-header">
              <div className="pickup-info">
                      <h4>{pickup.wasteType.charAt(0).toUpperCase() + pickup.wasteType.slice(1)} Waste</h4>
                      <p><strong>User:</strong> {pickup.user.firstName} {pickup.user.lastName}</p>
                      <p><strong>Quantity:</strong> {pickup.quantity}kg • <strong>Date:</strong> {formatDate(pickup.pickupDate)} • <strong>Time:</strong> {pickup.pickupTime}</p>
                      <p><strong>Address:</strong> {pickup.address}</p>
                      <p><strong>Status:</strong> <span className={`status-badge ${pickup.status}`}>{pickup.status.toUpperCase()}</span></p>
                      {pickup.notes && <p><strong>Notes:</strong> {pickup.notes}</p>}
              </div>
                    {pickup.status === 'pending' && (
              <div className="pickup-actions">
                        <button 
                          className="btn approve-btn"
                          onClick={() => handleApprove(pickup._id)}
                          disabled={actionLoading === pickup._id}
                        >
                          {actionLoading === pickup._id ? 'Approving...' : <><FaCheck /> Approve</>}
                        </button>
                        <button 
                          className="btn reject-btn"
                          onClick={() => handleReject(pickup._id)}
                          disabled={actionLoading === pickup._id}
                        >
                          {actionLoading === pickup._id ? 'Rejecting...' : <><FaTimes /> Reject</>}
                        </button>
                      </div>
                    )}
                  </div>
              </div>
              ))}
            </div>
          )}
            </div>
            
        {selectedPickup && (
          <div className="pickup-details-modal">
            <div className="modal-content">
              <h3>Pickup Details</h3>
              <div className="details-content">
                <p><strong>User:</strong> {selectedPickup.user.firstName} {selectedPickup.user.lastName}</p>
                <p><strong>Email:</strong> {selectedPickup.user.email}</p>
                <p><strong>Phone:</strong> {selectedPickup.user.phone}</p>
                <p><strong>Waste Type:</strong> {selectedPickup.wasteType}</p>
                <p><strong>Quantity:</strong> {selectedPickup.quantity}kg</p>
                <p><strong>Pickup Date:</strong> {formatDate(selectedPickup.pickupDate)}</p>
                <p><strong>Pickup Time:</strong> {selectedPickup.pickupTime}</p>
                <p><strong>Address:</strong> {selectedPickup.address}</p>
                {selectedPickup.notes && <p><strong>Notes:</strong> {selectedPickup.notes}</p>}
              </div>
              <div className="modal-actions">
                <textarea
                  placeholder="Admin notes (required for rejection)"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                />
                <div className="action-buttons">
                  <button 
                    className="btn approve-btn"
                    onClick={() => handleApprove(selectedPickup._id)}
                    disabled={actionLoading === selectedPickup._id}
                  >
                    {actionLoading === selectedPickup._id ? 'Approving...' : 'Approve'}
                  </button>
                  <button 
                    className="btn reject-btn"
                    onClick={() => handleReject(selectedPickup._id)}
                    disabled={actionLoading === selectedPickup._id}
                  >
                    {actionLoading === selectedPickup._id ? 'Rejecting...' : 'Reject'}
                  </button>
                  <button 
                    className="btn secondary"
                    onClick={() => setSelectedPickup(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 