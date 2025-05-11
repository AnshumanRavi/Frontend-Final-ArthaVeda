import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AboutUS = () => {
  const firstDivRef = useRef(null);
  const secondDivRef = useRef(null);
  const thirdDivRef = useRef(null);
  const navigate = useNavigate();
  const [currentProfile, setCurrentProfile] = useState(0);
  const [isFading, setIsFading] = useState(false);

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
        {/* First Cell - About Us */}
        <div
          ref={firstDivRef}
          style={{
            flex: 3,
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255)',
            borderRadius: '10px',
            minWidth: '250px',
            overflow: 'auto',
            paddingLeft: '40px',
            paddingRight: '40px',
            transform: 'translateY(100px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            opacity: '0',
          }}
        >
          <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>ABOUT US</h1>
          <p>
            Founded in 2017, Arthaveda is the Economics Department of Motilal Nehru College
            (Evening), University of Delhi...
            <Link to="/about" style={{ color: 'neutral' }}> Read More</Link>
          </p>
          <br />
          <h2><b>Vision</b></h2>
          <p>
            Arthaveda envisions fostering an intellectually stimulating environment...
            <Link to="/about" style={{ color: 'neutral' }}> Read More</Link>
          </p>
          <br />
          <h2><b>Mission</b></h2>
          <p>
            Arthaveda is committed to promoting academic rigor, critical inquiry...
            <Link to="/about" style={{ color: 'neutral' }}> Read More</Link>
          </p>
        </div>

        {/* Second Cell - Profile Card Carousel */}
        <div
          ref={secondDivRef}
          style={{
            flex: 2,
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255)',
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '250px',
            overflow: 'hidden',
            border: '1px solid #e0e0e0',
            boxShadow: '0 4px 8px rgba(0, 0, 0)',
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
              color: '#333',
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
              color: '#555',
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
              color: 'blue',
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

        {/* Third Cell - Messages */}
        <div
          ref={thirdDivRef}
          style={{
            flex: 3,
            padding: '20px',
            paddingLeft: '40px',
            paddingRight: '40px',
            backgroundColor: 'rgb(255, 255, 255)',
            borderRadius: '10px',
            minWidth: '250px',
            overflow: 'auto',
            transform: 'translateY(100px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            opacity: '0',
          }}
        >
          <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>MESSAGES</h1>
          <p>
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
              marginTop: '15px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto'
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