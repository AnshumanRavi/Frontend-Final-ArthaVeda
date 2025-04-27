import React, { useState } from 'react';

const NewSite = ({ onHeightChange }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [navbarHeight, setNavbarHeight] = useState(76); // Default navbar height (desktop, not scrolled)

  // Update navbar height when onHeightChange is called
  React.useEffect(() => {
    if (onHeightChange) {
      onHeightChange(setNavbarHeight);
    }
  }, [onHeightChange]);

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const messages = [
    {
      title: "From the Principal's Desk",
      content: [
        "It is with great pleasure and excitement that we celebrate the launch of the official website of the Department of Economics. This new platform is a significant milestone in the rapidly evolving digital era.",
        "This website represents our commitment to academic achievements, innovations, creative efforts, educational programmes, field trips and other extra-curricular activities. It serves as a gateway for students, faculty, alumni, and the broader community to explore the remarkable work being carried out by the Department.",
        "I congratulate the effort and vision that have gone into creating this website, which will surely inspire and empower all who engage with it.",
        "As we move forward, let this website serve as a beacon of advancement and an instrument for knowledge, collaboration, and innovation. I am hopeful that it will play an instrumental role in connecting us with the wider world and supporting our students and faculty in achieving new heights of success."
      ],
      signature: {
        regards: "Warm regards,",
        name: "Prof. Sandeep Garg",
        position: "Principal",
        college: "Motilal Nehru College E.",
        university: "University of Delhi"
      }
    },
    {
      title: "From In-Charge, Department of Economics",
      content: [
        "It is really a moment to cherish for all of us that the Department of Economics announces launch of the official website for the department. This endeavour undoubtedly marks a significant milestone for the department in creating its identity in the virtual world.",
        "This website is not just a digital space but a platform that reflects our vision, achievements, and aspirations and a gateway to innovation, collaboration, and knowledge sharing.",
        "Through this platform, our department can be more accessible not only to the students but also to the stakeholders and others interested to know about the department. Moreover, the department can demonstrate its achievements, enhance communications and attract attention of others towards it.",
        "The department of Economics expresses its gratitude to the Chairperson Prof. Vandana Saxena, Governing Body and the principal Prof. Sandeep Garg for extending support for the development and launch of the website."
      ],
      signature: {
        regards: "Warm regards.",
        name: "Dr. Bishnu Charan Nag",
        position: "In-Charge. Department of Economics",
        college: "Motilal Nehru College E.",
        university: "University of Delhi"
      }
    },
    {
      title: "From the Chairperson's Desk",
      content: [
        "With extreme pleasure and pride, I congratulate the Department of Economics, Motilal Nehru College (Eve) on the launch of the official website. This initiative represents a significant step towards academic excellence and innovation.",
        "This website forms a dynamic platform, designed to connect the Department of Economics with international academic and professional community. It demonstrates the vision, values, and aspirations of the students and facultycube, showcasing their activities, achievements, research outcomes, and the dynamic spirit that drives toward progress.",
        "I extend my gratitude and congratulations to the students and faculty of the department of Economics on making this initiative a reality. I wish that this website will inspire, inform, and connect and play a vital role in showcasing the students' activities.",
        "Let this be the beginning of new opportunities."
      ],
      signature: {
        regards: "Warm regards,",
        name: "Prof. Vandana Saxena",
        position: "Chairperson, Governing body",
        college: "Motilal Nehru College E.",
        university: "University of Delhi"
      }
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Announcement Header */}
      <div className="text-center mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome to Our New Website</h2>
        <p className="text-sm md:text-base text-gray-600">Celebrating our digital presence with messages from our leadership</p>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 ${
              expandedCard === index 
                ? 'fixed top-0 left-0 right-0 bottom-0 z-50 mx-4 md:mx-10 lg:mx-20 mt-[calc(var(--navbar-height)+16px)] mb-4 bg-white p-6 overflow-y-auto shadow-xl border border-gray-200'
                : 'cursor-pointer hover:shadow-md border border-gray-100'
            }`}
            style={expandedCard === index ? { '--navbar-height': `${navbarHeight}px` } : {}}
            onClick={() => toggleExpand(index)}
          >
            {/* Card Header - Deep red accent, only title */}
            <div className={`bg-[rgb(129,25,25)] text-white p-4 ${expandedCard === index ? 'sticky top-0 z-10' : ''}`}>
              <h3 className="text-lg md:text-xl font-medium">{message.title}</h3>
            </div>

            {/* Card Content */}
            <div className="p-4 md:p-5">
              {expandedCard === index ? (
                <>
                  {message.content.map((paragraph, i) => (
                    <p key={i} className="text-gray-800 mb-4 text-sm md:text-base leading-relaxed">{paragraph}</p>
                  ))}
                  <div className="mt-6 text-gray-700 text-sm md:text-base">
                    <p className="italic">{message.signature.regards}</p>
                    <p className="font-semibold text-gray-900">{message.signature.name}</p>
                    <p>{message.signature.position}</p>
                    <p>{message.signature.college}</p>
                    <p>{message.signature.university}</p>
                  </div>
                  <button 
                    className="mt-6 bg-[rgb(129,25,25)] hover:bg-[rgb(100,20,20)] text-white py-2 px-4 rounded text-sm transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(index);
                    }}
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-3">{message.content[0]}</p>
                  <p className="text-[rgb(129,25,25)] text-sm font-medium flex items-center">
                    <span>Read full message</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewSite;