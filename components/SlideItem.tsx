
import React, { useRef, useEffect } from 'react';
import type { Slide } from '../types';

interface SlideItemProps {
  media: Slide;
  isActive: boolean;
}

const SlideItem: React.FC<SlideItemProps> = ({ media, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the container div

  useEffect(() => {
    const videoElement = videoRef.current;
    const containerElement = containerRef.current;

    // Early return if it's not a video or refs aren't attached yet.
    if (media.type !== 'video' || !videoElement || !containerElement) {
      return;
    }
    
    // Function to play the video safely
    const playVideo = () => {
      videoElement.currentTime = 0;
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error(`Video autoplay was prevented for ${media.src}:`, error);
        });
      }
    };

    if (isActive) {
      // Instead of a fixed timer, we listen for the CSS transition to end.
      // This is more reliable as it guarantees the element is fully visible.
      const handleTransitionEnd = (event: TransitionEvent) => {
        // We only care about the opacity transition finishing.
        if (event.propertyName === 'opacity') {
          playVideo();
        }
      };
      
      // The { once: true } option automatically removes the listener after it fires.
      containerElement.addEventListener('transitionend', handleTransitionEnd, { once: true });

      // Cleanup function to remove the listener if the component unmounts
      // or isActive changes before the transition finishes.
      return () => {
        containerElement.removeEventListener('transitionend', handleTransitionEnd);
      };
    } else {
      videoElement.pause();
      videoElement.currentTime = 0; // Reset video to the start
    }
  }, [isActive, media.src, media.type]);

  const commonClasses = "absolute inset-0 w-full h-full object-cover";
  const transitionClasses = `transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`;

  return (
    <div ref={containerRef} className={`${commonClasses} ${transitionClasses}`}>
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
