
import React from 'react';
import type { Slide } from '../types';

interface SlideItemProps {
  slide: Slide;
  isActive: boolean;
}

const SlideItem: React.FC<SlideItemProps> = ({ slide, isActive }) => {
  const commonClasses = "absolute inset-0 w-full h-full object-cover";
  const transitionClasses = `transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`;

  return (
    <div className={`${commonClasses} ${transitionClasses}`}>
      <img src={slide.src} alt="Slideshow content" className="w-full h-full" />
    </div>
  );
};

export default SlideItem;