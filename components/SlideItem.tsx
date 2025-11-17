
import React, { useRef, useEffect } from 'react';
import type { Slide } from '../types';

interface SlideItemProps {
  media: Slide;
  isActive: boolean;
}

const SlideItem: React.FC<SlideItemProps> = ({ media, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isActive) {
      videoElement.currentTime = 0;
      videoElement.play().catch(error => {
        // Autoplay is often restricted by browsers and requires the video to be muted.
        console.error(`Video autoplay was prevented for ${media.src}:`, error);
      });
    } else {
      videoElement.pause();
    }
  }, [isActive, media.src]);

  const commonClasses = "absolute inset-0 w-full h-full object-cover";
  const transitionClasses = `transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`;

  return (
    <div className={`${commonClasses} ${transitionClasses}`}>
      {media.type === 'image' ? (
        <img src={media.src} alt="Slideshow content" className="w-full h-full" />
      ) : (
        <video
          ref={videoRef}
          src={media.src}
          className="w-full h-full"
          muted
          loop
          playsInline // Important for iOS autoplay
        />
      )}
    </div>
  );
};

export default SlideItem;
