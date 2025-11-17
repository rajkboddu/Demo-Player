
import type { Slide } from './types';

export const SLIDE_DURATION_MS = 15000;

// =================================================================
// ==                 ** IMPORTANT INSTRUCTIONS **                ==
// =================================================================
//
// To use your own images and videos, follow these steps:
//
// 1. UPLOAD YOUR FILES:
//    Place your image and video files into the `public/slideshow/` directory.
//    If this directory doesn't exist, please create it.
//
// 2. UPDATE THIS LIST:
//    Modify the `SLIDESHOW_FILES` array below to include your files.
//    - For local files in `public/slideshow/`, the `src` should start
//      with `/slideshow/`. For example: `/slideshow/my-cool-video.mp4`.
//    - You can also use direct URLs to images or videos from the web.
//    - The `type` must be either 'image' or 'video'.
//
// =================================================================

export const SLIDESHOW_FILES: Slide[] = [
  { type: 'image', src: 'https://picsum.photos/seed/alpha/1920/1080' },
  { type: 'video', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
  { type: 'image', src: 'https://picsum.photos/seed/bravo/1920/1080' },
  { type: 'video', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  { type: 'image', src: 'https://picsum.photos/seed/charlie/1920/1080' },
  { type: 'video', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
];
