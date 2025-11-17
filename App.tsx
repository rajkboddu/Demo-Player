
import React, { useState, useEffect } from 'react';
import { SLIDESHOW_FILES, SLIDE_DURATION_MS } from './constants';
import SlideItem from './components/SlideItem';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);

  useEffect(() => {
    if (SLIDESHOW_FILES.length === 0) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDESHOW_FILES.length);
    }, SLIDE_DURATION_MS);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (SLIDESHOW_FILES.length > 0) {
      const welcomeTimer = setTimeout(() => {
        setIsWelcomeVisible(false);
      }, 5000);

      return () => clearTimeout(welcomeTimer);
    }
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <div
        className={`
          absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 z-20 
          transition-opacity duration-1000 ease-in-out
          ${isWelcomeVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        aria-hidden={!isWelcomeVisible}
      >
        <div className="text-center p-4">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">Welcome to the Slideshow</h1>
            <p className="text-sm md:text-base">To add your own files, please read the instructions in the `src/constants.ts` file.</p>
        </div>
      </div>
      {SLIDESHOW_FILES.map((slide, index) => (
        <SlideItem
          key={`${slide.src}-${index}`}
          media={slide}
          isActive={index === currentIndex}
        />
      ))}
    </main>
  );
};

export default App;
