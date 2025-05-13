import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AboutUS = () => {
  const firstDivRef = useRef(null);
  const secondDivRef = useRef(null);
  const thirdDivRef = useRef(null);
  const navigate = useNavigate();
  const [currentProfile, setCurrentProfile] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const profiles = [
    {
      name: 'Dr. Bishnu Charan Nag',
      title: 'Teacher in Charge',
      image: '/tic.jpg',
      email: 'arthveda@mlne.du.ac.in'
    },
    {
      name: 'Professor Vandana Saxena',
      title: 'Chairperson',
      image: '/chairperson.jpg',
      email: 'arthveda@mlne.du.ac.in'
    },
    {
      name: 'Prof. Sandeep Garg',
      title: 'Principal',
      image: '/principal.jpg',
      email: 'arthveda@mlne.du.ac.in'
    }
  ];

  // Department data with Vision and Mission
  const department = {
    vision: 'The Department of Economics, established in 1965 under Motilal Nehru College (Evening), University of Delhi, envisions fostering a deep understanding of economic principles, preparing students for analytical and policy-oriented roles, and contributing to research that addresses real-world economic challenges.',
    mission: 'The Department endeavours to provide students with a strong foundation in economic theory, policy analysis, market behaviour, and applied research by equipping students with the ability to critically evaluate economic policies and market mechanisms.'
  };

  // Truncated vision for initial display (approximately half)
  const truncatedVision = department.vision.split('.').slice(0, 1).join('.') + '.';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              entry.target.classList.add('slide-up');
              entry.target.style.opacity = '1';
            });
          } else {
            entry.target.classList.remove('slide-up');
            entry.target.style.opacity = '0.8';
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    const elements = [firstDivRef.current, secondDivRef.current, thirdDivRef.current];

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Profile transition interval with fade effect
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentProfile((prev) => (prev + 1) % profiles.length);
        setIsFading(false);
      }, 150); // Fade-out duration
    }, 4000); // Profile cycling interval

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
      clearInterval(interval);
    };
  }, []);

  const handleReadMore = () => {
    navigate('/msgs');
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="my-5">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundImage: 'url(/photos/bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'left',
          padding: '20px',
          paddingLeft: '50px',
          paddingRight: '50px',
          gap: '20px',
          overflow: 'hidden',
          flexWrap: 'wrap',
        }}
      >
        {/* First Cell - Vision and Mission */}
        <div
          ref={firstDivRef}
          style={{
            flex: 3,
            padding: '30px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            minWidth: '250px',
            overflow: 'auto',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0',
            transform: 'translateY(100px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            opacity: '0',
          }}
        >
          <h1
            style={{
              textAlign: 'center',
              fontWeight: '800',
              fontSize: '2rem',
              color: '#1a202c',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Department of Economics
          </h1>
          <div
            style={{
              maxHeight: isExpanded ? 'none' : '400px',
              overflow: isExpanded ? 'visible' : 'hidden',
              transition: 'max-height 0.3s ease-out',
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <h2
                style={{
                  fontWeight: '600',
                  fontSize: '1.5rem',
                  color: '#2d3748',
                  marginBottom: '10px',
                  borderLeft: '4px solid #3182ce',
                  paddingLeft: '10px',
                }}
              >
                Vision
              </h2>
              <p
                style={{
                  color: '#4a5568',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  textAlign: 'justify',
                }}
              >
                {isExpanded ? department.vision : truncatedVision}
              </p>
            </div>
            {isExpanded && (
              <div style={{ marginBottom: '20px' }}>
                <h2
                  style={{
                    fontWeight: '600',
                    fontSize: '1.5rem',
                    color: '#2d3748',
                    marginBottom: '10px',
                    borderLeft: '4px solid #3182ce',
                    paddingLeft: '10px',
                  }}
                >
                  Mission
                </h2>
                <p
                  style={{
                    color: '#4a5568',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    textAlign: 'justify',
                  }}
                >
                  {department.mission}
                </p>
              </div>
            )}
          </div>
          {!isExpanded && (
            <button
              onClick={toggleExpand}
              style={{
                backgroundColor: '#3182ce',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                cursor: 'pointer',
                marginTop: '20px',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'background-color 0.2s ease',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#2b6cb0')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#3182ce')}
            >
              Read More
            </button>
          )}
        </div>

        {/* Second Cell - Profile Card Carousel */}
        <div
          ref={secondDivRef}
          style={{
            flex: 2,
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '250px',
            overflow: 'hidden',
            border: '1px solid #e0e0e0',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            opacity: '0',
            transform: 'translateY(100px)',
          }}
          className="profile-card"
        >
          <div
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '15px',
              border: '3px solid #fff',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              opacity: isFading ? 0 : 1,
              transform: isFading ? 'scale(0.95)' : 'scale(1)',
              transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
            }}
          >
            <img
              src={profiles[currentProfile].image}
              alt={profiles[currentProfile].name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
          <h3
            style={{
              fontWeight: 'bold',
              margin: '5px 0',
              fontSize: '1.5rem',
              color: '#2d3748',
              textAlign: 'center',
              width: '100%',
              opacity: isFading ? 0 : 1,
              transform: isFading ? 'scale(0.95)' : 'scale(1)',
              transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
            }}
          >
            {profiles[currentProfile].name}
          </h3>
          <p
            style={{
              margin: '5px 0',
              fontSize: '1rem',
              color: '#4a5568',
              textAlign: 'center',
              width: '100%',
              opacity: isFading ? 0 : 1,
              transform: isFading ? 'scale(0.95)' : 'scale(1)',
              transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
            }}
          >
            {profiles[currentProfile].title}
          </p>
          <a
            href={`mailto:${profiles[currentProfile].email}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              margin: '5px 0',
              color: '#3182ce',
              fontSize: '0.9rem',
              textAlign: 'center',
              width: '100%',
              opacity: isFading ? 0 : 1,
              transform: isFading ? 'scale(0.95)' : 'scale(1)',
              transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
              textDecoration: 'none',
            }}
          >
            {profiles[currentProfile].email}
          </a>
        </div>

        {/* Third Cell - Messages (Vertically Centered) */}
        <div
          ref={thirdDivRef}
          style={{
            flex: 3,
            padding: '20px 40px',
            backgroundColor: 'rgb(255, 255, 255)',
            borderRadius: '10px',
            minWidth: '250px',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transform: 'translateY(100px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            opacity: '0',
          }}
        >
          <h1 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>MESSAGES</h1>
          <p style={{ textAlign: 'center', marginBottom: '10px' }}>
            Read inspiring messages from our faculty members and learn about their vision for the department.
          </p>
          <button
            onClick={handleReadMore}
            style={{
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '8px 16px',
              cursor: 'pointer',
              display: 'block',
            }}
          >
            Read Messages
          </button>
        </div>

        {/* Media Query for Responsive Design */}
        <style>
          {`
            @media (max-width: 767px) {
              .flex-container {
                flex-direction: column;
                height: auto;
                padding: 10px;
              }
              .flex-container > div {
                flex: 1 1 100%;
                margin-bottom: 20px;
              }
            }

            .profile-card:hover {
              transform: translateY(-10px);
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            }

            .slide-up {
              transform: translateY(0) !important;
              opacity: 1 !important;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default AboutUS;