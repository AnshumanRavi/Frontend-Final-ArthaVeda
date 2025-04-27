import React, { useState, useEffect, useRef } from "react";

const Scroll = () => {
  const images = [...Array(7).keys()].map((i) => `/Scroll/${i + 1}.jpg`);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState("auto");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (imageRef.current) {
        const img = imageRef.current;
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        
        // For larger screens (>767px), we'll limit the width to 70% of viewport
        const maxWidth = isMobile ? window.innerWidth - 64 : Math.min(window.innerWidth * 0.7, 1200);
        const newHeight = maxWidth * aspectRatio;

        // Set container height (image height)
        setContainerHeight(`${newHeight}px`);
      }
    };

    if (imageRef.current) {
      const img = imageRef.current;
      img.addEventListener("load", updateDimensions);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
      updateDimensions();
    };

    window.addEventListener("resize", handleResize);
    updateDimensions();

    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("load", updateDimensions);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [currentIndex, isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.touches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;

    if (deltaX > 50) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      touchStartX.current = null;
    } else if (deltaX < -50) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      touchStartX.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`${isMobile ? "mx-8" : "mx-auto max-w-[1200px]"} ${isMobile ? "mt-4" : "mt-16 mb-0"} ${isMobile ? "flex items-center justify-center" : "flex items-center justify-center"}`}>
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden bg-white rounded-2xl`}
        style={{ 
          height: containerHeight,
          maxWidth: isMobile ? "100%" : "70vw"
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={goToPrevious}
          style={{ display: isMobile ? "none" : "block" }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70 transition-all"
        >
          &lt;
        </button>

        <button
          onClick={goToNext}
          style={{ display: isMobile ? "none" : "block" }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70 transition-all"
        >
          &gt;
        </button>

        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              ref={index === currentIndex ? imageRef : null}
              src={src}
              alt={`Image ${index + 1}`}
              className="h-full w-full flex-shrink-0 object-contain"
            />
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-white scale-125" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scroll;