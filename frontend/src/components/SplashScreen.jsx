import { useEffect, useState } from "react";

const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 2 : 100));
    }, 30);

    const timer = setTimeout(() => {
      onFinish();
    }, 1850);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-red-800 to-red-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* DU Logo */}
      <div className="absolute top-4 right-4 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 animate-fade-in-down">
        <img 
          src="/photos/du.png" 
          alt="University of Delhi Logo" 
          className="w-full h-full object-contain" 
          style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white">
        {/* Department Logo */}
        <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mb-8 flex items-center justify-center animate-pulse">
          <img 
            src="/photos/Artha.png" 
            alt="Arthashastra Logo" 
            className="w-full h-full object-contain drop-shadow-xl" 
          />
        </div>

        {/* Title */}
        <h1 className="mb-8 text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-center px-4 drop-shadow-md">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-red-100">
            Welcome to Economics Department
          </span>
        </h1>

        {/* Progress bar */}
        <div className="w-48 sm:w-60 md:w-72 h-2.5 sm:h-3 bg-white/30 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-white to-red-100 transition-all duration-300 ease-out"
            style={{ width: ${progress}% }}
          ></div>
        </div>

        {/* Loading text */}
        <p className="mt-4 text-sm sm:text-base text-white/80 font-medium animate-pulse">
          Loading {progress}%
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/60">
        Motilal Nehru College, University of Delhi
      </div>
    </div>
  );
};

export default SplashScreen;
