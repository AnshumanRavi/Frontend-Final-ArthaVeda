import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseDetails = () => {
  const navigate = useNavigate();

  const semesterThemes = [
    'from-indigo-500 to-purple-600',
    'from-amber-500 to-pink-600',
    'from-emerald-500 to-teal-600',
    'from-rose-500 to-fuchsia-600',
    'from-blue-500 to-cyan-600',
    'from-violet-500 to-purple-600'
  ];

  const semesters = [
    {
      id: 1,
      name: 'First Semester',
      courses: [
        'Introductory Microeconomics',
        'Basic Mathematics for Economics Analysis'
      ]
    },
    {
      id: 2,
      name: 'Second Semester',
      courses: [
        'Introductory Macroeconomics',
        'Basic Statistics for Economics'
      ]
    },
    {
      id: 3,
      name: 'Third Semester',
      courses: [
        'Intermediate Microeconomics',
        'Optimization method for Economic analysis'
      ]
    },
    {
      id: 4,
      name: 'Fourth Semester',
      courses: [
        'Intermediate Macroeconomics',
        'Basic Econometrics'
      ]
    },
    {
      id: 5,
      name: 'Fifth Semester',
      courses: [
        'Intermediate Microeconomics II Market Government and Welfare',
        'Introductory Development Economics',
        'Fiscal policy and Public Finance in India'
      ]
    },
    {
      id: 6,
      name: 'Sixth Semester',
      courses: [
        'Intermediate Macroeconomics 2 Policies issues',
        'Indian growth and Development',
        'Research Methodology'
      ]
    }
  ];

  const handleViewSyllabus = () => {
    navigate('/courses/syllabus');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-8 px-4 sm:px-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative text-center mb-16 p-6 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl shadow-xl backdrop-blur-sm border border-white/10">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white/90">Economics Course Curriculum</h1>
        <h2 className="text-xl md:text-2xl font-medium text-white/80">Bachelor of Arts in Economics</h2>
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-indigo-600 rotate-45"></div>
      </div>
      
      {/* Semester Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 z-10">
        {semesters.map((semester, index) => (
          <div 
            key={semester.id} 
            className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl border border-white/20 group`}
          >
            {/* Semester Header */}
            <div className={`bg-gradient-to-r ${semesterThemes[index]} text-white p-6 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
              <div className="relative">
                <div className="text-sm font-medium opacity-90 mb-1">Semester {semester.id}</div>
                <h3 className="text-2xl font-bold">{semester.name}</h3>
              </div>
              <div className="absolute -bottom-4 -right-4 text-8xl font-bold opacity-10">{semester.id}</div>
            </div>
            
            {/* Courses List */}
            <ul className="p-6 backdrop-blur-sm">
              {semester.courses.map((course, idx) => (
                <li 
                  key={idx} 
                  className="flex items-start mb-4 pb-4 border-b border-gray-200/50 last:border-0 last:mb-0 last:pb-0 group-hover:border-gray-200/80 transition-colors duration-300"
                >
                  <div className={`w-3 h-3 rounded-full mt-1.5 mr-3 flex-shrink-0 bg-gradient-to-r ${semesterThemes[index]}`}></div>
                  <div className="text-gray-700 flex-1 font-medium group-hover:text-gray-900 transition-colors duration-300">{course}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Syllabus Button */}
      <button 
        onClick={handleViewSyllabus}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-400/50 z-50 group"
      >
        <span className="relative z-10">View Syllabus</span>
        <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button>
    </div>
  );
};

export default CourseDetails;