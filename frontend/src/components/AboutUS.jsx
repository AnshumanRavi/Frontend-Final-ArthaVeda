import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUS = () => {
  const firstDivRef = useRef(null);
  const secondDivRef = useRef(null);
  const thirdDivRef = useRef(null);
  const navigate = useNavigate();

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

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
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
            <a href="/about" style={{ color: 'neutral' }}> Read More</a>
          </p>
          <br />
          <h2><b>Vision</b></h2>
          <p>
            Arthaveda envisions fostering an intellectually stimulating environment...
            <a href="/about" style={{ color: 'neutral' }}> Read More</a>
          </p>
          <br />
          <h2><b>Mission</b></h2>
          <p>
            Arthaveda is committed to promoting academic rigor, critical inquiry...
            <a href="/about" style={{ color: 'neutral' }}> Read More</a>
          </p>
        </div>

        {/* Second Cell - Profile Card */}
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
            overflow: 'auto',
            border: '1px solid #e0e0e0',
            boxShadow: '0 4px 8px rgba(0, 0, 0)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            opacity: '0',
            transform: 'translateY(100px)',
          }}
          className="profile-card"
        >
          <img
            src="/tic.jpg"
            alt="Dr. Bishnu Charan Nag"
            style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '15px', border: '3px solid #fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
          />
          <h3 style={{ fontWeight: 'bold', margin: '5px 0', fontSize: '1.5rem', color: '#333' }}>Dr. Bishnu Charan Nag</h3>
          <p style={{ margin: '5px 0', fontSize: '1rem', color: '#555' }}>Teacher in Charge</p>
          <p style={{ margin: '5px 0', color: 'blue', fontSize: '0.9rem' }}>arthveda@mlne.du.ac.in</p>
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