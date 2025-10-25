'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ImageModal({ images, initialIndex = 0, onClose, altPrefix = 'Image' }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex, onClose]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent">
          <div className="text-white font-medium">
            {currentIndex + 1} / {images.length}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Zoom Toggle */}
            <button
              onClick={toggleZoom}
              className="text-white hover:text-primary-400 transition-colors p-2 rounded-lg hover:bg-white/10"
              title={isZoomed ? 'Zoom Out' : 'Zoom In'}
            >
              {isZoomed ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-white hover:text-primary-400 transition-colors p-2 rounded-lg hover:bg-white/10"
              title="Close (Esc)"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Image Container */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className={`relative w-full h-full transition-all duration-300 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
            <div 
              className={`relative w-full h-full ${isZoomed ? 'overflow-auto' : ''}`}
              onClick={toggleZoom}
            >
              <Image
                src={images[currentIndex]}
                alt={`${altPrefix} ${currentIndex + 1}`}
                fill
                className={`${isZoomed ? 'object-contain scale-150' : 'object-contain'} transition-transform duration-300`}
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110"
              title="Previous (←)"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110"
              title="Next (→)"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                    index === currentIndex
                      ? 'ring-2 ring-primary-500 scale-105'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-white/60 text-sm hidden md:block">
          <p>Use arrow keys to navigate • Click image to zoom • Press ESC to close</p>
        </div>
      </div>
    </div>
  );
}

