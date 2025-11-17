
import React, { useState, useEffect } from 'react';
import { SLIDESHOW_FILES, SLIDE_DURATION_MS } from './constants';
import SlideItem from './components/SlideItem';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (SLIDESHOW_FILES.length === 0) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDESHOW_FILES.length);
    }, SLIDE_DURATION_MS);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
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
