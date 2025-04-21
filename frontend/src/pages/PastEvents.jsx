import React, { useState, useEffect } from 'react';

const PastEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);

  // Color palette variants
  const colors = [
    'from-red-700 to-red-600',
    'from-amber-600 to-orange-600',
    'from-violet-600 to-purple-600',
    'from-blue-600 to-indigo-600',
    'from-emerald-600 to-teal-600',
    'from-pink-600 to-rose-600'
  ];

  const getRandomColor = (index) => {
    return colors[index % colors.length];
  };

  // Fetch past events data from the API
  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const response = await fetch('https://dept-economics-motilal.onrender.com/pastEvents/events');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        data.reverse();
        // Ensure Google Drive links are properly formatted
        const formattedEvents = data.map(event => ({
          ...event,
          googleDriveLink: event.googleDriveLink?.startsWith('http') 
            ? event.googleDriveLink 
            : event.googleDriveLink ? `https://${event.googleDriveLink}` : null
        }));
        setEvents(formattedEvents);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPastEvents();
  }, []);

  // Handle image click
  const handleImageClick = (image, event) => {
    setSelectedImage(image);
    setActiveEvent(event);
  };

  // Close image modal
  const closeModal = () => {
    setSelectedImage(null);
    setActiveEvent(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl font-medium text-gray-700 animate-pulse">Loading Past Events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md border border-gray-200">
          <div className="text-red-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Events</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section with Deep Red Color */}
      <div 
        className="relative py-24 text-center text-white overflow-hidden"
        style={{ backgroundColor: 'rgb(129, 25, 25)' }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/10"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold tracking-wider text-red-200 uppercase">
              Department of Economics
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6 animate-fade-in-down">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-red-100">
              Past Events Gallery
            </span>
          </h1>
          <p className="text-xl font-light max-w-2xl mx-auto text-red-100 animate-fade-in-up delay-100">
            Celebrating our journey through memorable academic gatherings and events
          </p>
          <div className="mt-8 animate-fade-in-up delay-200">
            <div className="inline-flex items-center">
              <div className="w-16 h-1 bg-red-300 rounded-full"></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
              <div className="w-16 h-1 bg-red-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Curved Bottom Edge */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-16 fill-current text-white">
            <path d="M0,0V60H1440V0C1225,60,1013,60,720,60S215,60,0,0Z"></path>
          </svg>
        </div>
      </div>

      {/* Events Container */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {events.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-red-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-600">No past events found</h3>
            <p className="text-gray-500 mt-2">Check back later for upcoming events</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => {
              const colorClass = getRandomColor(index);
              return (
                <div 
                  key={event._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
                    opacity: 0
                  }}
                >
                  {/* Event Header with Gradient */}
                  <div className={`bg-gradient-to-r ${colorClass} p-5 text-white`}>
                    <h2 className="text-xl font-bold truncate">{event.eventName}</h2>
                    {event.date && (
                      <p className="text-sm opacity-90 mt-1 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {/* Event Images */}
                  <div className="p-4">
                    {(event.cloudinaryLinks?.length > 0 || event.googleDriveLink) ? (
                      <div className="grid grid-cols-2 gap-2">
                        {event.cloudinaryLinks?.slice(0, 4).map((image, idx) => (
                          <div
                            key={idx}
                            className={`relative overflow-hidden rounded-lg aspect-square cursor-pointer transition-all duration-300 ${idx === 3 && event.cloudinaryLinks.length > 4 ? 'bg-black/20' : ''}`}
                            onClick={() => handleImageClick(image, event)}
                          >
                            <img
                              src={image}
                              alt={`Event ${idx + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                            {idx === 3 && event.cloudinaryLinks.length > 4 && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-lg">
                                +{event.cloudinaryLinks.length - 4}
                              </div>
                            )}
                          </div>
                        ))}
                        {event.googleDriveLink && (
                          <a
                            href={event.googleDriveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-br from-gray-50 to-white rounded-lg aspect-square flex flex-col items-center justify-center text-center p-3 hover:from-gray-100 hover:to-gray-50 transition-all duration-300 border border-gray-200"
                          >
                            <div className="text-red-500 mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-600">View All Photos</span>
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Event Footer */}
                  <div className="px-4 pb-4">
                    <button 
                      onClick={() => handleImageClick(event.cloudinaryLinks?.[0], event)}
                      className={`w-full py-2 bg-gradient-to-r ${colorClass} text-white rounded-lg hover:opacity-90 transition-all text-sm font-medium flex items-center justify-center`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Event
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Enhanced Image Modal */}
      {selectedImage && activeEvent && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-modal-in border-4 border-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Gradient */}
            <div className={`bg-gradient-to-r ${getRandomColor(events.findIndex(e => e._id === activeEvent._id))} p-4 text-white flex justify-between items-center sticky top-0 z-10`}>
              <div>
                <h3 className="font-bold text-lg">{activeEvent.eventName}</h3>
                {activeEvent.date && (
                  <p className="text-sm opacity-90">{new Date(activeEvent.date).toLocaleDateString()}</p>
                )}
              </div>
              <button 
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-56px)] bg-gradient-to-br from-gray-50 to-white">
              <div className="p-6">
                <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-white">
                  <img
                    src={selectedImage}
                    alt="Selected Event"
                    className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                  />
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {activeEvent.cloudinaryLinks?.length > 1 && (
                <div className="p-6 pt-0">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-inner">
                    <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      Event Gallery
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                      {activeEvent.cloudinaryLinks.map((image, idx) => (
                        <div
                          key={idx}
                          className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${selectedImage === image ? 'border-red-500 scale-105' : 'border-transparent hover:border-gray-300'}`}
                          onClick={() => setSelectedImage(image)}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Google Drive Link */}
              {activeEvent.googleDriveLink && (
                <div className="p-6 pt-0">
                  <a
                    href={activeEvent.googleDriveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    View Complete Album on Google Drive
                  </a>
                </div>
              )}
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
        @keyframes modal-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-in {
          animation: modal-in 0.3s ease-out forwards;
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
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
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
        .delay-200 {
          animation-delay: 0.2s;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default PastEvents;