import React, { useEffect, useState } from 'react';

const Faculty = () => {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Sophisticated color palette with professional tones
  const colors = [
    'from-red-800 to-red-700',
    'from-blue-800 to-blue-700',
    'from-emerald-800 to-emerald-700',
    'from-amber-800 to-amber-700',
    'from-indigo-800 to-indigo-700',
    'from-teal-800 to-teal-700'
  ];

  const getRandomColor = (index) => {
    return colors[index % colors.length];
  };

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await fetch('https://dept-economics-motilal.onrender.com/faculties/professors');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setFacultyMembers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, []);

  const openModal = (faculty) => {
    setSelectedFaculty(faculty);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const filteredFaculty = facultyMembers.filter(faculty => {
    if (activeTab === 'all') return true;
    // Add logic for other tabs if needed (professors, visiting, etc.)
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl font-medium text-gray-700 animate-pulse">Loading Faculty Members...</p>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Faculty</h2>
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
              Our Distinguished Faculty
            </span>
          </h1>
          <p className="text-xl font-light max-w-2xl mx-auto text-red-100 animate-fade-in-up delay-100">
            Meet the brilliant minds shaping the future of economics education
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

      {/* Faculty Container */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Filter tabs */}
        <div className="flex justify-center mb-12">
          {/* Add tab filters here if needed */}
        </div>

        {filteredFaculty.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700">No faculty members found</h3>
            <p className="text-gray-500 mt-1">Please check back later or try a different filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFaculty.map((faculty, index) => {
              const colorClass = getRandomColor(index);
              return (
                <div 
                  key={faculty._id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
                    opacity: 0
                  }}
                  onClick={() => openModal(faculty)}
                >
                  {/* Faculty Header with Gradient */}
                  <div className={`bg-gradient-to-r ${colorClass} p-5 text-white relative overflow-hidden`}>
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <svg className="absolute inset-0 w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#pattern)" />
                      </svg>
                    </div>
                    
                    <div className="relative z-10">
                      <h2 className="text-xl font-bold">{faculty.name}</h2>
                      <p className="text-sm opacity-90 mt-1">{faculty.designation || 'Professor'}</p>
                    </div>
                  </div>

                  {/* Faculty Content */}
                  <div className="p-5">
                    <div className="flex items-center mb-4">
                      <div className="relative mr-4">
                        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md group-hover:border-red-100 transition-all">
                          <img
                            src={faculty.imageUrl || '/default-faculty.jpg'}
                            alt={faculty.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = '/default-faculty.jpg';
                            }}
                          />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-sm bg-gradient-to-r ${colorClass}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        {faculty.department && (
                          <p className="text-sm font-medium text-gray-600">{faculty.department}</p>
                        )}
                        {faculty.qualification && (
                          <p className="text-xs text-gray-500 mt-1">{faculty.qualification}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Bio with Left Border Accent */}
                    <div className="pl-3 border-l-2 border-gray-200">
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {faculty.bio || 'Expert in their field with extensive teaching and research experience.'}
                      </p>
                    </div>
                  </div>

                  {/* Faculty Footer */}
                  <div className="px-5 pb-5">
                    <button 
                      className={`w-full py-2 bg-gradient-to-r ${colorClass} text-white rounded-lg hover:opacity-90 transition-all text-sm font-medium flex items-center justify-center shadow-md`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      View Profile
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Enhanced Faculty Modal */}
      {isModalOpen && selectedFaculty && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-modal-in border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Gradient */}
            <div className={`bg-gradient-to-r ${getRandomColor(facultyMembers.findIndex(f => f._id === selectedFaculty._id))} p-5 text-white flex justify-between items-center sticky top-0 z-10`}>
              <div>
                <h3 className="font-bold text-xl">{selectedFaculty.name}</h3>
                <p className="text-sm opacity-90 mt-1">{selectedFaculty.designation || 'Professor'}</p>
              </div>
              <button 
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-72px)]">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-8 mb-8">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <div className="w-40 h-40 rounded-xl bg-gray-200 overflow-hidden border-4 border-white shadow-lg mx-auto sm:mx-0">
                      <img
                        src={selectedFaculty.imageUrl || '/default-faculty.jpg'}
                        alt={selectedFaculty.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Faculty Details */}
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedFaculty.department && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Department</p>
                          <p className="text-gray-800 font-medium">{selectedFaculty.department}</p>
                        </div>
                      )}
                      
                      {selectedFaculty.email && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</p>
                          <p className="text-gray-800 font-medium break-all">{selectedFaculty.email}</p>
                        </div>
                      )}
                      
                      {selectedFaculty.qualification && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</p>
                          <p className="text-gray-800 font-medium">{selectedFaculty.qualification}</p>
                        </div>
                      )}
                      
                      {selectedFaculty.specialization && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</p>
                          <p className="text-gray-800 font-medium">{selectedFaculty.specialization}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Full Bio */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Professional Profile
                  </h4>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    {selectedFaculty.bio || 'No profile information available.'}
                  </div>
                </div>
                
                {/* Research/Publications Section */}
                {selectedFaculty.research && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center text-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Research Interests
                    </h4>
                    <div className="prose prose-sm max-w-none text-gray-700">
                      {selectedFaculty.research}
                    </div>
                  </div>
                )}
              </div>
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
        .prose {
          line-height: 1.6;
        }
        .prose p:not(:last-child) {
          margin-bottom: 1em;
        }
      `}</style>
    </div>
  );
};

export default Faculty;