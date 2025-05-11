import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const CollegeNavbar = ({ onHeightChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCommunityHovered, setIsCommunityHovered] = useState(false);
  const [isCoursesHovered, setIsCoursesHovered] = useState(false);
  const [isEconomicSocietyHovered, setIsEconomicSocietyHovered] = useState(false);
  const [magazineData, setMagazineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const response = await fetch("https://dept-economics-motilal.onrender.com/magazine/magazines");
        if (!response.ok) {
          throw new Error("Failed to fetch magazine data");
        }
        const data = await response.json();
        setMagazineData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMagazines();

    let ticking = false;
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(lastScrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navbarHeight = isMobile ? 60 : isScrolled ? 40 : 76;

  useEffect(() => {
    if (onHeightChange) {
      onHeightChange(navbarHeight);
    }
  }, [navbarHeight, onHeightChange]);

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isScrolled ? '2px 16px' : '20px 16px',
    height: isScrolled ? '40px' : '76px',
    opacity: isScrolled ? 0.9 : 1,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'white',
    zIndex: 1000,
    transition: 'height 0.3s ease-in-out, padding 0.3s ease-in-out',
    boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
    willChange: 'transform'
  };

  const navStyle = {
    position: 'fixed',
    top: isScrolled ? '40px' : '76px',
    left: '5%',
    right: '5%',
    transition: 'top 0.3s ease-in-out',
    willChange: 'top'
  };

  const mobileHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 16px',
    height: '60px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'white',
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  return (
    <>
      {!isMobile && (
        <>
          <div style={headerStyle}>
            <div style={{ paddingLeft: '9px', display: 'flex', alignItems: 'center' }}>
              <img 
                src="/photos/department1.png" 
                alt="Department" 
                style={{ 
                  height: isScrolled ? '30px' : '56px',
                  transition: 'height 0.3s ease-in-out'
                }} 
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
              <img 
                src="/photos/Arthashastra.png" 
                alt="Arthashastra" 
                style={{ 
                  height: isScrolled ? '30px' : '56px',
                  transition: 'height 0.3s ease-in-out'
                }} 
              />
            </div>
            <div style={{ paddingRight: '9px', display: 'flex', alignItems: 'center' }}>
              <img 
                src="/photos/College1.png" 
                alt="College Name" 
                style={{ 
                  height: isScrolled ? '30px' : '56px',
                  transition: 'height 0.3s ease-in-out'
                }} 
              />
            </div>
          </div>

          <nav
            className="bg-[rgb(129,25,25)] rounded-2xl h-[52px] p-4 shadow-lg z-10 text-white"
            style={navStyle}
          >
            <div className="flex items-center justify-center h-full">
              <div className="flex justify-evenly w-full">
                {["/", "/Faculty", "/Committees", "/Courses", "/Economic-Society", "/Magazine"].map((path, index) => {
                  if (path === "/Courses") {
                    return (
                      <div
                        key={index}
                        onMouseEnter={() => setIsCoursesHovered(true)}
                        onMouseLeave={() => setIsCoursesHovered(false)}
                        style={{ position: 'relative' }}
                      >
                        <button
                          className="text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-black flex items-center gap-1"
                          style={{ transform: 'scale(1)', willChange: 'transform' }}
                        >
                          Courses
                          <span>▼</span>
                        </button>
                        {isCoursesHovered && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '100%',
                              left: 0,
                              background: 'white',
                              color: 'black',
                              borderRadius: '8px',
                              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                              zIndex: 1001,
                              width: '160px',
                              padding: '10px 0',
                            }}
                          >
                            <NavLink
                              to="/courses/course-details"
                              className="block px-4 py-2 hover:bg-gray-200 transition-colors duration-300"
                            >
                              Course Details
                            </NavLink>
                            <NavLink
                              to="/courses/syllabus"
                              className="block px-4 py-2 hover:bg-gray-200 transition-colors duration-300"
                            >
                              Syllabus
                            </NavLink>
                          </div>
                        )}
                      </div>
                    );
                  } else if (path === "/Economic-Society") {
                    return (
                      <div
                        key={index}
                        onMouseEnter={() => setIsEconomicSocietyHovered(true)}
                        onMouseLeave={() => setIsEconomicSocietyHovered(false)}
                        style={{ position: 'relative' }}
                      >
                        <button
                          className="text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-black flex items-center gap-1"
                          style={{ transform: 'scale(1)', willChange: 'transform' }}
                        >
                          Economic Society
                          <span>▼</span>
                        </button>
                        {isEconomicSocietyHovered && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '100%',
                              left: 0,
                              background: 'white',
                              color: 'black',
                              borderRadius: '8px',
                              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                              zIndex: 1001,
                              width: '160px',
                              padding: '10px 0',
                            }}
                          >
                            <NavLink
                              to="/Economic-Society"
                              className="block px-4 py-2 hover:bg-gray-200 transition-colors duration-300"
                            >
                              About
                            </NavLink>
                            <NavLink
                              to="/economic-society/office-bearers"
                              className="block px-4 py-2 hover:bg-gray-200 transition-colors duration-300"
                            >
                              Office Bearers
                            </NavLink>
                          </div>
                        )}
                      </div>
                    );
                  } else if (path === "/Magazine") {
                    if (loading) {
                      return (
                        <span
                          key={index}
                          className="text-white px-4 py-2 rounded-lg opacity-70 cursor-not-allowed"
                        >
                          Magazine
                        </span>
                      );
                    }
                    if (error) {
                      return (
                        <span
                          key={index}
                          className="text-white px-4 py-2 rounded-lg opacity-70 cursor-not-allowed"
                          title={error}
                        >
                          Magazine
                        </span>
                      );
                    }
                    if (magazineData && magazineData.length > 0) {
                      return (
                        <a
                          key={index}
                          href={magazineData[0].magazineLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-black"
                          style={{ transform: 'scale(1)', willChange: 'transform' }}
                        >
                          Magazine
                        </a>
                      );
                    }
                    return (
                      <span
                        key={index}
                        className="text-white px-4 py-2 rounded-lg opacity-70 cursor-not-allowed"
                      >
                        Magazine
                      </span>
                    );
                  } else {
                    return (
                      <NavLink
                        key={index}
                        to={path}
                        className={({ isActive }) =>
                          `text-white px-4 py-2 rounded-lg transition-all duration-300 ${
                            isActive ? 'bg-black' : 'hover:bg-black'
                          }`
                        }
                        style={{ transform: 'scale(1)', willChange: 'transform' }}
                      >
                        {path === "/" ? "Home" : path.replace("/", "").replace("-", " ")}
                      </NavLink>
                    );
                  }
                })}

                <div
                  onMouseEnter={() => setIsCommunityHovered(true)}
                  onMouseLeave={() => setIsCommunityHovered(false)}
                  style={{ position: 'relative' }}
                >
                  <button
                    className="text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-black flex items-center gap-1"
                    style={{ transform: 'scale(1)', willChange: 'transform' }}
                  >
                    Community
                    <span>▼</span>
                  </button>

                  {isCommunityHovered && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        background: 'white',
                        color: 'black',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        zIndex: 1001,
                        width: '160px',
                        padding: '10px 0',
                      }}
                    >
                      <NavLink
                        to="/alumni"
                        className="block px-4 py-2 hover:bg-gray-200 transition-colors duration-300"
                      >
                        Alumni
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </>
      )}

      {isMobile && (
        <>
          <div style={mobileHeaderStyle}>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
              <img src="/photos/Arthashastra.png" alt="Arthashastra" style={{ height: '40px' }} />
              <img src="/photos/department2.png" alt="Department" style={{ height: '40px' }} />
              <div style={{ cursor: 'pointer' }} onClick={() => setIsNavOpen(!isNavOpen)}>
                <img src="/photos/shortnavbar.png" alt="Menu" style={{ height: '40px' }} />
              </div>
            </div>
          </div>

          {isNavOpen && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '220px',
                height: '100%',
                background: 'white',
                color: 'black',
                padding: '20px',
                zIndex: 1001,
                transition: 'transform 0.3s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                transform: isNavOpen ? 'translateX(0)' : 'translateX(100%)'
              }}
            >
              <button
                onClick={() => setIsNavOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'black',
                  fontSize: '24px',
                  cursor: 'pointer',
                  alignSelf: 'flex-end',
                }}
                aria-label="Close menu"
              >
                ✖
              </button>
              {["/", "/Faculty", "/Committees"].map((path, index) => (
                <NavLink
                  key={index}
                  to={path}
                  onClick={() => setIsNavOpen(false)}
                  className="text-white bg-red-800 px-4 py-2 rounded-lg text-center hover:bg-black transition-colors duration-300"
                >
                  {path === "/" ? "Home" : path.replace("/", "").replace("-", " ")}
                </NavLink>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <NavLink
                  to="/courses/course-details"
                  onClick={() => setIsNavOpen(false)}
                  className="text-white bg-red-800 px-4 py-2 rounded-lg text-center hover:bg-black transition-colors duration-300"
                >
                  Course Details
                </NavLink>
                <NavLink
                  to="/courses/syllabus"
                  onClick={() => setIsNavOpen(false)}
                  className="text-white bg-red-800 px-4 py-2 rounded-lg text-center hover:bg-black transition-colors duration-300"
                >
                  Syllabus
                </NavLink>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <NavLink
                  to="/Economic-Society"
                  onClick={() => setIsNavOpen(false)}
                  className="text-white bg-red-800 px-4 py-2 rounded-lg text-center hover:bg-black transition-colors duration-300"
                >
                  Economic Society
                </NavLink>
                <NavLink
                  to="/economic-society/office-bearers"
                  onClick={() => setIsNavOpen(false)}
                  className="text-white bg-red-800 px-4 py-2 rounded-lg text-center hover:bg-black transition-colors duration-300"
                >
                  Office Bearers
                </NavLink>
              </div>
              {/* Magazine Link - External */}
              {loading ? (
                <span className="text-white bg-red-800 px-4 py-2 rounded-lg text-center opacity-70 cursor-not-allowed">
                  Magazine
                </span>
              ) : error ? (
                <span 
                  className="text-white bg-red-800 px-4 py-2 rounded-lg text-center opacity-70 cursor-not-allowed"
                  title={error}
                >
                  Magazine
                </span>
              ) : magazineData && magazineData.length > 0 ? (
                <a
                  href={magazineData[0].magazineLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsNavOpen(false)}
                  className="text-white bg-red-800 px-4 py-2 rounded-lg text-center hover:bg-black transition-colors duration-300"
                >
                  Magazine
                </a>
              ) : (
                <span className="text-white bg-red-800 px-4 py-2 rounded-lg text-center opacity-70 cursor-not-allowed">
                  Magazine
                </span>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <NavLink
                  to="/alumni"
                  onClick={() => setIsNavOpen(false)}
                  className="text-white bg-red-800 px-4 py-2 rounded-lg text-center hover:bg-black transition-colors duration-300"
                >
                  Alumni
                </NavLink>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CollegeNavbar;