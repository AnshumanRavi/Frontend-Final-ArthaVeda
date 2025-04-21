import React, { useEffect, useState } from 'react';

const Faculty = () => {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading Faculty...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-md border border-red-100">
          <div className="text-red-500 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-5 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Our <span className="text-red-600">Faculty</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Meet the distinguished professors of our Economics Department
        </p>
      </div>

      {/* Faculty Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {facultyMembers.map((faculty) => (
          <div 
            key={faculty._id}
            onClick={() => openModal(faculty)}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group cursor-pointer"
          >
            {/* Colored Top Bar */}
            <div className="h-2 bg-gradient-to-r from-red-500 to-red-400"></div>
            
            {/* Faculty Content */}
            <div className="p-5">
              {/* Compact Profile Image */}
              <div className="flex items-center mb-4">
                <div className="relative mr-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                    <img
                      src={faculty.imageUrl || '/default-faculty.jpg'}
                      alt={faculty.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/default-faculty.jpg';
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                
                {/* Name and Department */}
                <div>
                  <h2 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">{faculty.name}</h2>
                  <p className="text-sm text-red-500 font-medium">{faculty.department}</p>
                </div>
              </div>
              
              {/* Bio with Left Border Accent */}
              <div className="pl-3 border-l-2 border-red-300">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {faculty.bio}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div 
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-95 animate-in fade-in-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Close Button */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">{selectedFaculty.name}</h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg mx-auto sm:mx-0">
                    <img
                      src={selectedFaculty.imageUrl || '/default-faculty.jpg'}
                      alt={selectedFaculty.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Faculty Details */}
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-1">{selectedFaculty.department}</h3>
                  {selectedFaculty.email && (
                    <p className="text-gray-600 mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {selectedFaculty.email}
                    </p>
                  )}
                  <div className="h-1 w-20 bg-red-400 my-3"></div>
                </div>
              </div>
              
              {/* Full Bio */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">About</h4>
                <p className="text-gray-600">{selectedFaculty.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes fade-in-zoom-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-in {
          animation: fade-in-zoom-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Faculty;