
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
    // Early return if it's not a video or the ref isn't attached yet.
    if (media.type !== 'video' || !videoElement) {
      return;
    }

    if (isActive) {
      // We delay the play command to ensure the fade-in transition (1000ms)
      // has completed. This helps avoid browsers pausing the video for power
      // saving, as the element is fully visible when play() is called.
      const playTimer = setTimeout(() => {
        videoElement.currentTime = 0;
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error(`Video autoplay was prevented for ${media.src}:`, error);
          });
        }
      }, 1000); // Match the CSS transition duration

      return () => clearTimeout(playTimer);
    } else {
      videoElement.pause();
      videoElement.currentTime = 0; // Reset video to the start
    }
  }, [isActive, media.src, media.type]);

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
