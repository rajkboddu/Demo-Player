import type { Slide } from './types';

export const SLIDE_DURATION_MS = 15000;

// =================================================================
// ==                 ** IMPORTANT INSTRUCTIONS **                ==
// =================================================================
//
// To use your own images from the `public/slideshow/` directory,
// you MUST format the path starting with a forward slash (`/`).
//
// CORRECT FORMAT:
// { src: '/slideshow/my-image.jpg' }
//
// INCORRECT FORMATS:
// { src: 'slideshow/my-image.jpg' }      (Missing leading slash)
// { src: './slideshow/my-image.jpg' }     (Incorrect relative path)
// { src: 'public/slideshow/my-image.jpg' } (Do not include 'public')
//
// =================================================================

export const SLIDESHOW_FILES: Slide[] = [
  { src: '/Demo-Player/slideshow/slide2.jpg' },
  { src: '/Demo-Player/slideshow/slide3.jpg' }
];
