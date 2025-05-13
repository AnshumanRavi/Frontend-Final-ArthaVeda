import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const response = await fetch("https://dept-economics-motilal.onrender.com/magazine/magazines");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setMagazines(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMagazines();
  }, []);

  if (loading) {
    return <p className="text-center">Loading magazines...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  return (
    <footer className="bg-[#3a0e0a] text-white py-8 px-12 font-sans">
      <div className="flex flex-col md:flex-row justify-between flex-wrap">
        {/* Contact Us Section */}
        <div className="flex-1 p-2">
          <h3 className="text-[#e74c3c] border-b-2 border-[#e74c3c] pb-1 mb-2 text-center md:text-left">
            Contact Us
          </h3>
          <ul className="space-y-1 text-center md:text-left text-sm">
            <li>
              📞{" "}
              <a href="tel:+911124112604" className="hover:text-[#e74c3c]">
                91-11-24112604
              </a>
            </li>
            <li>
              ✉{" "}
              <a href="mailto:feedback@mln.du.ac.in" className="hover:text-[#e74c3c]">
                feedback@mln.du.ac.in
              </a>
            </li>
            <li>
              🌐{" "}
              <a href="mailto:motilalnehru64@gmail.com" className="hover:text-[#e74c3c]">
                motilalnehru64@gmail.com
              </a>
            </li>
          </ul>
          {/* AKAM Image Below Contact Us */}
          <div className="mt-4 flex justify-center md:justify-start">
            <img
              src="/photos/AKAM.png"
              alt="AKAM Logo"
              className="w-24 h-auto sm:w-28 md:w-32 object-contain"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex-1 p-2">
          <h3 className="text-[#e74c3c] border-b-2 border-[#e74c3c] pb-1 mb-2 text-center md:text-left">
            Quick Links
          </h3>
          <ul className="space-y-1 text-center md:text-left">
            <li>
              <Link to="/" className="cursor-pointer hover:text-[#e74c3c] transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/faculty" className="cursor-pointer hover:text-[#e74c3c] transition duration-300">
                Faculty
              </Link>
            </li>
            <li>
              <Link to="/courses" className="cursor-pointer hover:text-[#e74c3c] transition duration-300">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/Economic-Society" className="cursor-pointer hover:text-[#e74c3c] transition duration-300">
                Economic Society
              </Link>
            </li>
            <li>
              {magazines.length > 0 ? (
                <a
                  href={
                    magazines[0].magazineLink.startsWith('http://') || magazines[0].magazineLink.startsWith('https://')
                      ? magazines[0].magazineLink
                      : `https://${magazines[0].magazineLink}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:text-[#e74c3c] transition duration-300"
                >
                  Magazine
                </a>
              ) : (
                <span className="cursor-not-allowed">Magazine</span>
              )}
            </li>
          </ul>
        </div>

        {/* Explore */}
        <div className="flex-1 p-2">
          <h3 className="text-[#e74c3c] border-b-2 border-[#e74c3c] pb-1 mb-2 text-center md:text-left">
            Explore
          </h3>
          <ul className="space-y-1 text-center md:text-left">
            <li>
              <Link className="cursor-pointer hover:text-[#e74c3c] transition duration-300">
                Campus
              </Link>
            </li>
            <li>
              <a
                href="https://maps.app.goo.gl/jPpY2dYUgMYvUVD3A?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-[#e74c3c] transition duration-300"
              >
                How To Reach
              </a>
            </li>
            {/* Arthashastra Image Below How To Reach - Tripled height and negative effect */}
            <li className="mt-4">
              <div className="flex justify-center md:justify-start">
                <img
                  src="/photos/Arthashastra.png"
                  alt="Arthashastra Logo"
                  className="w-32 h-24 sm:w-40 sm:h-32 md:w-48 md:h-36 object-contain filter invert"
                  style={{ 
                    marginTop: '0.1rem',
                    height: 'calc(4 * 1.5rem)', // Tripling the original height
                    width: 'auto', // Maintain aspect ratio
                    maxWidth: '100%'
                  }}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;