import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define modern styles with blinking effect
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  .notice-container {
    font-family: 'Inter', sans-serif;
    background-color: rgb(249, 226, 228); /* Light pink background */
  }

  .scroll-container {
    height: 256px; /* h-64 */
    overflow: hidden;
    position: relative;
  }

  .scroll-content {
    animation: scroll 20s linear infinite;
  }

  .scroll-content.paused {
    animation-play-state: paused;
  }

  @keyframes scroll {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }

  @keyframes blink {
    0%, 100% { background-color: #fee2e2; } /* Light red */
    50% { background-color: #dbeafe; } /* Light blue */
  }

  .card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    animation: none; /* Stop blinking on hover */
  }

  .blink-even {
    animation: blink 2s infinite;
  }

  .blink-odd {
    animation: blink 2s infinite 1s; /* Offset by 1s for alternate blinking */
  }

  .modal-container {
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    background: linear-gradient(145deg, #ffffff, #f9fafb);
  }

  .view-all-btn {
    transition: color 0.2s ease, transform 0.2s ease;
  }

  .view-all-btn:hover {
    color: #2563eb;
    transform: translateX(4px);
  }

  @media (max-width: 767px) {
    .notice-inner-container {
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 0 16px;
    }
    .scroll-container {
      height: 200px; /* Slightly shorter on mobile */
    }
    .modal-container {
      padding-left: 1rem;
      padding-right: 1rem;
      max-height: 80vh;
      overflow-y: auto;
    }
  }
`;

const Modal = ({ content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="modal-container bg-white p-8 rounded-lg max-w-2xl w-full mx-4 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="text-xl font-semibold text-gray-800">{content.subject}</h3>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed whitespace-pre-wrap break-words">
          {content.body}
        </p>
        {content.link && (
          <a
            href={content.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 mt-4 inline-block font-medium transition-colors"
          >
            Learn More
          </a>
        )}
      </div>
    </div>
  );
};

const ScrollableList = ({ items, title, navigateTo, accentColor }) => {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Adjust animation duration based on number of items
  const animationDuration = items.length * 3; // 3 seconds per item

  return (
    <div className="flex-1 p-6 bg-white rounded-xl shadow-lg" style={{ width: '280px' }}>
      <style>{styles}</style>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <button
          onClick={() => navigate(navigateTo)}
          className="view-all-btn text-blue-500 font-medium hover:text-blue-600"
        >
          View All
        </button>
      </div>
      <div
        className="scroll-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-live="polite"
      >
        <div className={`scroll-content ${isPaused ? 'paused' : ''}`} style={{ animationDuration: `${animationDuration}s` }}>
          {[...items, ...items].map((item, index) => (
            <div
              key={index}
              className={`card p-4 mb-3 cursor-pointer ${index % 2 === 0 ? 'blink-even' : 'blink-odd'}`}
              style={{ borderLeft: `4px solid ${accentColor}` }}
              onClick={() => setModalContent(item)}
            >
              <h3 className="font-semibold text-gray-800">{item.subject}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
      {modalContent && <Modal content={modalContent} onClose={() => setModalContent(null)} />}
    </div>
  );
};

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);

  // Fetch notices from the API
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("https://dept-economics-motilal.onrender.com/notice/all");
        if (!response.ok) throw new Error("Failed to fetch notices");
        const data = await response.json();
        const lastTenNotices = data.notices.slice(-10).reverse();
        setNotices(lastTenNotices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://dept-economics-motilal.onrender.com/upcomingEvents/all");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        const lastTenEvents = data.events.slice(-10);
        setEvents(lastTenEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="notice-container flex justify-center items-center min-h-[400px] py-8">
      <style>{styles}</style>
      <div className="notice-inner-container flex flex-col md:flex-row w-full max-w-4xl gap-8 mx-auto px-4">
        <ScrollableList
          items={notices}
          title="Notices"
          navigateTo="/notices"
          accentColor="#ef4444" // Red accent for notices
        />
        <ScrollableList
          items={events}
          title="Upcoming Events"
          navigateTo="/upcoming-events"
          accentColor="#3b82f6" // Blue accent for events
        />
      </div>
    </div>
  );
};

export default Notice;