import React, { useEffect, useRef, useState } from 'react';

const AboutUS = () => {
  const secondDivRef = useRef(null);
  const thirdDivRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

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
      { threshold: 0.2 }
    );

    [secondDivRef.current, thirdDivRef.current].forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMessages = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="my-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        padding: '40px',
        gap: '30px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {/* Profile Card */}
        <div ref={secondDivRef} style={{
          flex: '0 1 300px',
          padding: '25px',
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          transform: 'translateY(100px)',
          transition: 'all 0.8s ease-out',
          opacity: '0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '300px',
          height: expanded ? 'auto' : 'fit-content'
        }}>
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px',
            overflow: 'hidden',
            border: '5px solid white',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <img 
              src="/tic.jpg" 
              alt="Dr. Bishnu Charan Nag" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <h3 style={{ 
            color: '#333', 
            margin: '10px 0 5px',
            fontWeight: '600',
            fontSize: '1.3rem'
          }}>Dr. Bishnu Charan Nag</h3>
          <p style={{ 
            color: '#6a11cb',
            fontWeight: '500',
            marginBottom: '20px'
          }}>Teacher in Charge</p>
          
          <div style={{
            width: '100%',
            padding: '15px',
            background: '#f8f9fa',
            borderRadius: '10px',
            marginTop: 'auto'
          }}>
            <p style={{ 
              color: '#555', 
              fontStyle: 'italic',
              textAlign: 'center',
              margin: 0
            }}>
              "Education is the most powerful weapon which you can use to change the world."
            </p>
          </div>
        </div>

        {/* Messages Section */}
        <div ref={thirdDivRef} style={{
          flex: '1 1 300px',
          padding: '30px',
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          transform: 'translateY(100px)',
          transition: 'all 0.8s ease-out',
          opacity: '0',
          minWidth: '300px',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            color: 'white',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <h1 style={{ margin: 0, fontWeight: '600' }}>MESSAGES</h1>
          </div>
          
          <div style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Teacher-in-Charge Message */}
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px',
              borderLeft: '4px solid #6a11cb'
            }}>
              <h3 style={{ 
                color: '#11998e', 
                marginTop: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#6a11cb'
                }}></span>
                From the Teacher-in-Charge
              </h3>
              <p style={{ color: '#555', lineHeight: '1.6' }}>
                {expanded ? (
                  <>
                    It gives me great joy to see how far the Department of Economics has come. As the Teacher-in-Charge, I've had the chance to witness firsthand the hard work, initiative, and spark our students bring to everything they do.<br /><br />
                    Arthaveda has truly become the heartbeat of our department. The level of planning, coordination, and passion students have shown—whether it's hosting events, building connections, or recently launching Econiqa, our department's official magazine—makes me genuinely proud.<br /><br />
                    What stands out most is the sense of ownership our students take. They don't just participate; they build, lead, and leave something behind for the next batch to grow upon.<br /><br />
                    It has been my dream for the past five years to see something like this take shape—and I'm incredibly happy to see it finally happening. With the launch of the official website as well, Arthaveda is stepping into a new era of outreach, collaboration, and visibility.<br /><br />
                    I hope this spirit continues to thrive. May Arthaveda keep evolving, exploring new ideas and themes that inspire not just our department, but the wider academic community.
                  </>
                ) : (
                  "It gives me great joy to see how far the Department of Economics has come. Arthaveda has truly become the heartbeat of our department..."
                )}
              </p>
              <p style={{ 
                fontWeight: 'bold', 
                color: '#333',
                marginBottom: 0
              }}>
                — Dr. Bishnu Charan Nag
              </p>
            </div>
            
            {/* Chairman's Message */}
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px',
              borderLeft: '4px solid #2575fc'
            }}>
              <h3 style={{ 
                color: '#11998e', 
                marginTop: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#2575fc'
                }}></span>
                From the Chairman
              </h3>
              <p style={{ color: '#555', lineHeight: '1.6' }}>
                {expanded ? (
                  <>
                    Being part of the Economics Department at Motilal Nehru College (Evening) has always been a matter of pride, and watching our students take initiative through platforms like Arthaveda only adds to that feeling.<br /><br />
                    Over the years, the department has grown—not just academically, but in terms of creativity, community engagement, and student-led activities. The dedication shown by our students in organizing events, seminars, and now, launching Econiqa, the department's first-ever magazine, is truly commendable.<br /><br />
                    As we take another step forward with the launch of Arthaveda's official website, it feels like a new chapter is beginning—one that will help us reach a wider audience and showcase the amazing work happening within our department.<br /><br />
                    Arthaveda represents more than just a society; it reflects the spirit of the department—curious minds, collaborative effort, and a drive to do something meaningful beyond the classroom.
                  </>
                ) : (
                  "Being part of the Economics Department has always been a matter of pride. Arthaveda represents more than just a society; it reflects the spirit of the department..."
                )}
              </p>
              <p style={{ 
                fontWeight: 'bold', 
                color: '#333',
                marginBottom: 0
              }}>
                — Professor Vandena Saxena
              </p>
            </div>
            
            {/* Principal's Message */}
            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px',
              borderLeft: '4px solid #11998e'
            }}>
              <h3 style={{ 
                color: '#11998e', 
                marginTop: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#11998e'
                }}></span>
                From the Principal
              </h3>
              <p style={{ color: '#555', lineHeight: '1.6' }}>
                {expanded ? (
                  <>
                    It always brings me immense satisfaction to see students pushing boundaries—not just in academics, but in creativity, collaboration, and leadership. The Economics Department, through Arthaveda, has been doing just that.<br /><br />
                    With the launch of their official website and the department magazine Econiqa, the students have taken a commendable step toward building a more visible, active, and connected community. It's a pleasure to see such ideas take shape and come to life.<br /><br />
                    Arthaveda represents a vibrant culture of initiative, intellect, and expression that we are proud to nurture at Motilal Nehru College (Evening). I hope this continues to grow and inspires others to create, contribute, and lead with the same passion.
                  </>
                ) : (
                  "It always brings me immense satisfaction to see students pushing boundaries. Arthaveda represents a vibrant culture of initiative, intellect, and expression..."
                )}
              </p>
              <p style={{ 
                fontWeight: 'bold', 
                color: '#333',
                marginBottom: 0
              }}>
                — Principal, Motilal Nehru College (Evening)
              </p>
            </div>
            
            <button 
              onClick={toggleMessages}
              style={{
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '30px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '10px',
                alignSelf: 'center',
                boxShadow: '0 4px 15px rgba(17, 153, 142, 0.3)',
                transition: 'all 0.3s ease',
                width: expanded ? '200px' : '180px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(17, 153, 142, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(17, 153, 142, 0.3)';
              }}
            >
              {expanded ? 'Show Less' : 'Read All Messages'}
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .flex-container > div {
              max-width: 100% !important;
            }
          }
          .slide-up {
            transform: translateY(0) !important;
            opacity: 1 !important;
          }
        `}
      </style>
    </div>
  );
};

export default AboutUS;