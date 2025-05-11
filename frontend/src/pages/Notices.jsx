import React, { useEffect, useState } from "react";

// Define modern styles
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  /* Main container */
  .notice-board {
    font-family: 'Inter', sans-serif;
    background-color: #fefce8; /* Soft ivory */
    min-height: 100vh;
  }

  /* Header section */
  .header-section {
    background: linear-gradient(135deg, rgb(129, 25, 25) 0%, rgb(153, 27, 27) 100%);
    position: relative;
    overflow: hidden;
    padding: 5rem 1rem;
    z-index: 1;
  }

  /* Card styles */
  .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    border: 1px solid #fef08a; /* Subtle amber border */
    animation: fadeInUp 0.5s ease-out forwards;
  }

  .card:hover {
    transform: scale(1.03);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    animation: none; /* Stop blinking on hover */
  }

  /* Blinking animations for amber border */
  @keyframes blink-amber {
    0%, 100% { border-left-color: #b45309; } /* Deep amber */
    50% { border-left-color: #fed7aa; } /* Soft amber */
  }

  .blink-amber-even {
    animation: blink-amber 2s infinite;
  }

  .blink-amber-odd {
    animation: blink-amber 2s infinite 1s;
  }

  /* Modal styles */
  .modal-container {
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    border: 1px solid linear-gradient(to right, #e7e5e4, #d6d3d1);
    transform: scale(0.9);
    animation: modalOpen 0.4s ease-out forwards;
  }

  @keyframes modalOpen {
    to { transform: scale(1); }
  }

  /* Read More link */
  .read-more {
    transition: color 0.2s ease, transform 0.2s ease, scale 0.2s ease;
  }

  .read-more:hover {
    color: #1e3a8a;
    transform: translateX(4px) scale(1.05);
  }

  /* Responsive adjustments */
  @media (max-width: 767px) {
    .notice-grid {
      grid-template-columns: 1fr;
      padding: 0 16px;
    }
    .header-section {
      padding: 4rem 1rem;
    }
  }
`;

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notices from the API
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("https://dept-economics-motilal.onrender.com/notice/all");
        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }
        const data = await response.json();
        setNotices(data.notices.reverse()); // Reverse to show latest first
      } catch (error) {
        console.error("Error fetching notices:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Open modal with selected notice
  const openModal = (notice) => {
    setSelectedNotice(notice);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setSelectedNotice(null);
    document.body.style.overflow = 'auto';
  };

  // Truncate text and add "Read More" link
  const truncateText = (text, maxLength = 100, notice) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return (
      <>
        {text.slice(0, maxLength)}...
        <span 
          className="read-more text-blue-600 font-medium ml-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            openModal(notice);
          }}
        >
          Read More
        </span>
      </>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fefce8]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#b45309] border-t-[#1e3a8a] rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-[#1c1917]">Loading Notices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fefce8] p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md border border-[#e7e5e4]">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-[#1c1917] mb-2">Error Loading Notices</h2>
          <p className="text-[#4b5563] mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-all shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="notice-board">
      <style>{styles}</style>
      {/* Header Section */}
      <div className="header-section text-center text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl font-extrabold mb-4 animate-fade-in-down tracking-tight text-white">
            Notice Board
          </h1>
          <p className="text-lg font-light max-w-2xl mx-auto text-amber-100 animate-fade-in-up delay-100">
            Stay updated with the latest announcements and important information
          </p>
        </div>
        {/* Curved Bottom Edge */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg viewBox="0 0 1440 60" className="w-full h-12 fill-current text-[#fefce8]">
            <path d="M0,0V60H1440V0C1225,60,1013,60,720,60S215,60,0,0Z"></path>
          </svg>
        </div>
      </div>

      {/* Notices Container */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {notices.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-[#b45309] mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 WZ0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[#1c1917]">No notices found</h3>
            <p className="text-[#4b5563] mt-2">Check back later for new announcements</p>
          </div>
        ) : (
          <div className="notice-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice, index) => (
              <div 
                key={notice._id}
                className={`card p-6 cursor-pointer ${index % 2 === 0 ? 'blink-amber-even' : 'blink-amber-odd'}`}
                style={{ borderLeft: '4px solid #b45309', animation: `fadeInUp 0.5s ease-out ${index * 0.08}s forwards` }}
                onClick={() => openModal(notice)}
              >
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#b45309]/10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#b45309]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-[#1c1917] line-clamp-1">
                    {notice.subject}
                  </h2>
                </div>
                <p className="text-[#4b5563] mb-4 line-clamp-3 text-sm">
                  {truncateText(notice.body, 100, notice)}
                </p>
                <div className="text-xs text-[#6b7280]">
                  {new Date(notice.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div 
            className="modal-container max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-[#1c1917]">{selectedNotice.subject}</h2>
                  <div className="text-sm text-[#6b7280] mt-1">
                    {new Date(selectedNotice.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </div>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-[#b45309]/10 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#b45309]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-4 max-h-[calc(90vh-160px)] overflow-y-auto">
                <p className="text-[#4b5563] whitespace-pre-wrap text-base">
                  {selectedNotice.body}
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-[#e7e5e4] bg-[#fefce8]">
              <button 
                onClick={closeModal}
                className="w-full py-2 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-all"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx global>{`
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </div>
  );
};

export default NoticeBoard;