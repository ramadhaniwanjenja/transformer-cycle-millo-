import React from 'react';
import { FaPlay, FaGraduationCap, FaClock, FaStar } from 'react-icons/fa';
import './Tutorials.css';

const Tutorials: React.FC = () => {
  const tutorials = [
    {
      id: 1,
      title: "DIY Plastic Bottle Plant Pots",
      description: "Transform old plastic bottles into beautiful and functional plant pots for your home or garden.",
      image: "/images/download (10).jpg",
      duration: "15 min",
      difficulty: "Easy",
      points: 10,
      videoUrl: "https://youtu.be/sBvL0Ss-pT4?si=5XKjbWdb24IHzzxE"
    },
    {
      id: 2,
      title: "Creative E-Waste Art",
      description: "Discover how to create unique art pieces from discarded electronic components and circuit boards.",
      image: "/images/inspiration.jpg",
      duration: "25 min",
      difficulty: "Medium",
      points: 10,
      videoUrl: "https://youtu.be/v8JJCbfIlws?si=5_QkpfyG6vqT4eiy"
    },
    {
      id: 3,
      title: "Upcycled Denim Tote Bag",
      description: "Turn old jeans into stylish and durable tote bags. Perfect for shopping or everyday use.",
      image: "/images/bag.jpg",
      duration: "30 min",
      difficulty: "Medium",
      points: 10,
      videoUrl: "https://youtu.be/Nulpilk4WYw?si=0_8mjAvuHeySgIyw"
    },
    {
      id: 4,
      title: "Tire Upcycle Planter",
      description: "Transform old tires into beautiful garden planters for your home or community garden.",
      image: "/images/Recycling of waste Tyre.jpg",
      duration: "20 min",
      difficulty: "Easy",
      points: 10,
      videoUrl: "https://youtu.be/qpfs6umotTc?si=HERuK6UFwdpdgWcf"
    },
    {
      id: 5,
      title: "Glass Lamp Shade",
      description: "Repurpose glass into beautiful lamp shade for your kitchen and workspace.",
      image: "/images/Materiales Archives.jpg",
      duration: "35 min",
      difficulty: "Hard",
      points: 10,
      videoUrl: "https://youtu.be/f5JiJy-dELs?si=BobEh_KKaaz1mjlr"
    },
    {
      id: 6,
      title: "Cardboard Furniture DIY",
      description: "Create functional furniture pieces from cardboard boxes - eco-friendly and budget-friendly!",
      image: "/images/Easy DIY FLOATING SHELVES.jpg",
      duration: "45 min",
      difficulty: "Hard",
      points: 10,
      videoUrl: "https://youtu.be/oZ5eL0947Ls?si=pUXzCEamDU_Bk9HS"
    }
  ];

  return (
    <div className="tutorials-page">
      <div className="tutorials-hero">
        <div className="hero-content">
          <h1>Upcycling Tutorials</h1>
          <p>Learn how to transform waste into valuable products through our tutorials. Each completed tutorial earns you 10 Green Points.</p>
        </div>
      </div>
      
      <div className="tutorials-grid">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="tutorial-card">
            <div className="tutorial-image">
              <img src={tutorial.image} alt={tutorial.title} />
              <div className="tutorial-overlay">
                <FaPlay className="play-icon" />
              </div>
            </div>
            <div className="tutorial-content">
              <h3>{tutorial.title}</h3>
              <p>{tutorial.description}</p>
              <div className="tutorial-meta">
                <span className="duration">
                  <FaClock /> {tutorial.duration}
                </span>
                <span className="difficulty">
                  <FaStar /> {tutorial.difficulty}
                </span>
                <span className="points">
                  +{tutorial.points} points
                </span>
              </div>
              <a 
                href={tutorial.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn view-tutorial"
              >
                View Tutorial
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials; 