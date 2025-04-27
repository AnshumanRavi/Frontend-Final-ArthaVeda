import { useEffect, useState } from "react";

const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 2 : 100));
    }, 30);

    // Trigger fade-out just before finishing
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1550); // Start fade-out 300ms before finish

    // Finish after 1850ms
    const timer = setTimeout(() => {
      onFinish();
    }, 1850);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-[rgb(129,25,25)] to-[rgb(80,15,15)] transition-opacity duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/5 left-1/3 w-48 h-48 bg-red-300 rounded-full mix-blend-screen filter blur-2xl opacity-60 animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-56 h-56 bg-red-400 rounded-full mix-blend-screen filter blur-2xl opacity-60 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/5 left-1/2 w-52 h-52 bg-red-200 rounded-full mix-blend-screen filter blur-2xl opacity-60 animate-pulse animation-delay-3000"></div>
      </div>

      {/* DU Logo */}
      <div className="absolute top-4 right-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 animate-slide-in-right">
        <img
          src="/photos/du.png"
          alt="University of Delhi Logo"
          className="w-full h-full object-contain"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white">
        {/* Department Logo */}
        <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 mb-6 animate-zoom-in">
          <img
            src="/photos/Artha.png"
            alt="Arthashastra Logo"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Title */}
        <h1 className="mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-wide text-center px-6 drop-shadow-lg animate-fade-in-up">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[rgb(200,100,100)]">
            Economics Department
          </span>
        </h1>

        {/* Progress Bar */}
        <div className="w-40 sm:w-52 md:w-64 h-2 bg-white/20 rounded-full overflow-hidden shadow-md">
          <div
            className="h-full bg-gradient-to-r from-white to-[rgb(200,100,100)] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Loading Text */}
        <p className="mt-3 text-xs sm:text-sm md:text-base text-white/90 font-medium animate-fade-in">
          Loading {progress}%
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-3 left-0 right-0 text-center text-xs sm:text-sm text-white/70 animate-fade-in-up">
        Motilal Nehru College, University of Delhi
      </div>
    </div>
  );
};

export default SplashScreen;