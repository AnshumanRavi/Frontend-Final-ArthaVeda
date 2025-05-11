import React, { useEffect, useState } from "react";

// Define modern styles
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  /* Main container */
  .events-board {
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
    border: 1px solid #a5b4fc; /* Subtle indigo border */
    animation: fadeInUp 0.5s ease-out forwards;
  }

  .card:hover {
    transform: scale(1.03);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    animation: none; /* Stop blinking on hover */
  }

  /* Blinking animations for indigo border */
  @keyframes blink-indigo {
    0%, 100% { border-left-color: #4f46e5; } /* Deep indigo */
    50% { border-left-color: #a5b4fc; } /* Soft indigo */
  }

  .blink-indigo-even {
    animation: blink-indigo 2s infinite;
  }

  .blink-indigo-odd {
    animation: blink-indigo 2s infinite 1s;
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

  /* Read More and link styles */
  .read-more, .event-link {
    transition: color 0.2s ease, transform 0.2s ease, scale 0.2s ease;
  }

  .read-more:hover, .event-link:hover {
    color: #1e3a8a;
    transform: translateX(4px) scale(1.05);
  }

  /* Responsive adjustments */
  @media (max-width: 767px) {
    .events-grid {
      grid-template-columns: 1fr;
      padding: 0 16px;
    }
    .header-section {
      padding: 4rem 1rem;
    }
  }
`;

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://dept-economics-motilal.onrender.com/UpcomingEvents/all");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data.events.reverse()); // Reverse to show latest first
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Open modal with selected event
  const openModal = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'auto';
  };

  // Truncate text and add "Read More" link
  const truncateText = (text, maxLength = 100, event) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return (
      <>
        {text.slice(0, maxLength)}...
        <span 
          className="read-more text-blue-600 font-medium ml-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            openModal(event);
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
          <div className="w-12 h-12 border-4 border-[#4f46e5] border-t-[#1e3a8a] rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-[#1c1917]">Loading Events...</p>
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
          <h2 className="text-xl font-semibold text-[#1c1917] mb-2">Error Loading Events</h2>
          <p className="text-[#4b5563] mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#4f46e5] text-white rounded-lg hover:bg-[#4338ca] transition-all shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="events-board">
      <style>{styles}</style>
      {/* Header Section */}
      <div className="header-section text-center text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl font-extrabold mb-4 animate-fade-in-down tracking-tight text-white">
            Upcoming Events
          </h1>
          <p className="text-lg font-light max-w-2xl mx-auto text-amber-100 animate-fade-in-up delay-100">
            Discover exciting events and activities happening soon
          </p>
        </div>
        {/* Curved Bottom Edge */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg viewBox="0 0 1440 60" className="w-full h-12 fill-current text-[#fefce8]">
            <path d="M0,0V60H1440V0C1225,60,1013,60,720,60S215,60,0,0Z"></path>
          </svg>
        </div>
      </div>

      {/* Events Container */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {events.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-[#4f46e5] mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[#1c1917]">No upcoming events</h3>
            <p className="text-[#4b5563] mt-2">Check back later for new events</p>
          </div>
        ) : (
          <div className="events-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div 
                key={event._id}
                className={`card p-6 cursor-pointer ${index % 2 === 0 ? 'blink-indigo-even' : 'blink-indigo-odd'}`}
                style={{ borderLeft: '4px solid #4f46e5', animation: `fadeInUp 0.5s ease-out ${index * 0.08}s forwards` }}
                onClick={() => openModal(event)}
              >
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#4f46e5]/10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4f46e5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-[#1c1917] line-clamp-1">
                    {event.subject}
                  </h2>
                </div>
                <p className="text-[#4b5563] mb-4 line-clamp-3 text-sm">
                  {truncateText(event.body, 100, event)}
                </p>
                {event.link && (
                  <a 
                    href={event.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="event-link inline-block mt-2 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Event Link →
                  </a>
                )}
                <div className="text-xs text-[#6b7280] mt-4">
                  {new Date(event.createdAt).toLocaleString("en-US", {
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
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div 
            className="modal-container max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-[#1c1917]">{selectedEvent.subject}</h2>
                  <div className="text-sm text-[#6b7280] mt-1">
                    {new Date(selectedEvent.createdAt).toLocaleString("en-US", {
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
                  className="p-2 rounded-full hover:bg-[#4f46e5]/10 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4f46e5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-4 max-h-[calc(90vh-160px)] overflow-y-auto">
                <p className="text-[#4b5563] whitespace-pre-wrap text-base">
                  {selectedEvent.body}
                </p>
                {selectedEvent.link && (
                  <div className="mt-6">
                    <a 
                      href={selectedEvent.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-[#4f46e5] text-white rounded-lg hover:bg-[#4338ca] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Visit Event Page
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 border-t border-[#e7e5e4] bg-[#fefce8]">
              <button 
                onClick={closeModal}
                className="w-full py-2 bg-[#4f46e5] text-white rounded-lg hover:bg-[#4338ca] transition-all"
              >
                Close Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
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

export default UpcomingEvents;