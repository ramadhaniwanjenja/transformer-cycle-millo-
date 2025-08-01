import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tutorialsAPI } from '../services/api';
import { FaPlay, FaClock, FaStar, FaCheck, FaSearch, FaFilter, FaGraduationCap, FaRecycle, FaGlasses, FaPaperPlane, FaTshirt } from 'react-icons/fa';
import './Tutorials.css';

interface Tutorial {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
  difficulty: string;
  duration: number;
  pointsReward: number;
  materials: Array<{
    name: string;
    quantity: string;
    optional: boolean;
  }>;
  steps: Array<{
    stepNumber: number;
    title: string;
    description: string;
    imageUrl: string;
  }>;
}

interface UserTutorial {
  _id: string;
  tutorial: Tutorial;
  isCompleted: boolean;
  completedAt: string;
  pointsEarned: number;
  watchProgress: number;
  lastWatchedAt: string;
}

const Tutorials: React.FC = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [userTutorials, setUserTutorials] = useState<UserTutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoProgress] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
    fetchTutorials();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProgress();
    }
  }, [isAuthenticated]);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
  };

  const fetchTutorials = async () => {
    try {
      const response = await tutorialsAPI.getAll();
      if (response.data.success) {
        setTutorials(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching tutorials:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    try {
      const response = await tutorialsAPI.getProgress();
      if (response.data.success) {
        setUserTutorials(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  const updateProgress = async (tutorialId: string, progress: number, completed: boolean = false) => {
    try {
      await tutorialsAPI.updateProgress(tutorialId, {
        progress,
        completed
      });

      // Refresh user progress
      await fetchUserProgress();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handleVideoComplete = () => {
    if (selectedTutorial) {
      updateProgress(selectedTutorial._id, 100, true);
      setShowVideoModal(false);
      alert('🎉 Tutorial completed! You earned 10 points!');
      
      // Dispatch event to notify dashboard
      window.dispatchEvent(new CustomEvent('tutorialCompleted'));
    }
  };

  const handleVideoProgress = (progress: number) => {
    if (selectedTutorial && progress > 90) { // Mark as complete at 90%
      handleVideoComplete();
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'plastic': return <FaRecycle />;
      case 'paper': return <FaPaperPlane />;
      case 'glass': return <FaGlasses />;
      case 'textile': return <FaTshirt />;
      default: return <FaGraduationCap />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#f44336';
      default: return '#666';
    }
  };

  const getUserProgress = (tutorialId: string) => {
    const userTutorial = userTutorials.find(ut => ut.tutorial._id === tutorialId);
    return userTutorial || null;
  };

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'plastic', label: 'Plastic', icon: <FaRecycle /> },
    { value: 'paper', label: 'Paper', icon: <FaPaperPlane /> },
    { value: 'glass', label: 'Glass', icon: <FaGlasses /> },
    { value: 'metal', label: 'Metal' },
    { value: 'textile', label: 'Textile', icon: <FaTshirt /> },
    { value: 'general', label: 'General', icon: <FaGraduationCap /> }
  ];

  const difficulties = [
    { value: '', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  return (
    <div className="tutorials-page">
      <div className="tutorials-header">
        <h1>🎓 Upcycling Tutorials</h1>
        <p>Learn creative ways to upcycle waste and earn points for each completed tutorial!</p>
      </div>

      {/* Search and Filter Section */}
      <div className="tutorials-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search tutorials..."
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
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              {difficulties.map(difficulty => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Tutorials Grid */}
      {loading ? (
        <div className="loading">Loading tutorials...</div>
      ) : (
      <div className="tutorials-grid">
          {filteredTutorials.map((tutorial) => {
            const userProgress = getUserProgress(tutorial._id);
            const isCompleted = userProgress?.isCompleted;
            const progress = userProgress?.watchProgress || 0;

            return (
              <div key={tutorial._id} className={`tutorial-card ${isCompleted ? 'completed' : ''}`}>
                <div className="tutorial-thumbnail">
                  {tutorial.thumbnail ? (
                    <img src={tutorial.thumbnail} alt={tutorial.title} />
                  ) : (
                    <div className="thumbnail-placeholder">
                      {getCategoryIcon(tutorial.category)}
                    </div>
                  )}
                  
                  {isCompleted && (
                    <div className="completion-badge">
                      <FaCheck />
                    </div>
                  )}
                  
              <div className="tutorial-overlay">
                    <button
                      className="play-button"
                      onClick={() => {
                        setSelectedTutorial(tutorial);
                        setShowVideoModal(true);
                      }}
                    >
                      <FaPlay />
                    </button>
              </div>
            </div>

                <div className="tutorial-info">
                  <div className="tutorial-header">
              <h3>{tutorial.title}</h3>
              <div className="tutorial-meta">
                      <span className="difficulty" style={{ color: getDifficultyColor(tutorial.difficulty) }}>
                        {tutorial.difficulty}
                      </span>
                <span className="duration">
                        <FaClock /> {tutorial.duration} min
                </span>
                <span className="points">
                        <FaStar /> +{tutorial.pointsReward} pts
                </span>
                    </div>
                  </div>

                  <p className="tutorial-description">{tutorial.description}</p>

                  {userProgress && (
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${progress}%` }}
                      ></div>
                      <span className="progress-text">{Math.round(progress)}%</span>
                    </div>
                  )}

                  <div className="tutorial-actions">
                    <button
                      className="btn watch-btn"
                      onClick={() => {
                        setSelectedTutorial(tutorial);
                        setShowVideoModal(true);
                      }}
                    >
                      {isCompleted ? 'Watch Again' : 'Start Learning'}
                    </button>
                    
                    {tutorial.materials.length > 0 && (
                      <button className="btn materials-btn">
                        View Materials
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && selectedTutorial && (
        <div className="video-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedTutorial.title}</h2>
              <button 
                className="close-btn"
                onClick={() => setShowVideoModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="video-container">
              <video
                controls
                autoPlay
                onTimeUpdate={(e) => {
                  const video = e.target as HTMLVideoElement;
                  const progress = (video.currentTime / video.duration) * 100;
                  handleVideoProgress(progress);
                }}
                onEnded={handleVideoComplete}
                style={{ width: '100%', maxHeight: '400px' }}
              >
                <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Fallback for demo - simulate video completion */}
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <button 
                  className="btn watch-btn"
                  onClick={() => {
                    alert('🎉 Tutorial completed! You earned 10 points!');
                    handleVideoComplete();
                  }}
                  style={{ margin: '0 auto' }}
                >
                  🎬 Complete Tutorial (Demo)
                </button>
              </div>
            </div>

            <div className="tutorial-details">
              <div className="materials-section">
                <h3>Materials Needed:</h3>
                <ul>
                  {selectedTutorial.materials.map((material, index) => (
                    <li key={index} className={material.optional ? 'optional' : ''}>
                      {material.name} - {material.quantity}
                      {material.optional && <span className="optional-tag">(Optional)</span>}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="steps-section">
                <h3>Steps:</h3>
                {selectedTutorial.steps.map((step) => (
                  <div key={step.stepNumber} className="step">
                    <h4>Step {step.stepNumber}: {step.title}</h4>
                    <p>{step.description}</p>
          </div>
        ))}
      </div>
            </div>
          </div>
        </div>
      )}

      {!isAuthenticated && (
        <div className="auth-prompt">
          <h3>Sign in to track your progress and earn points!</h3>
          <div className="auth-buttons">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn">Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tutorials; 