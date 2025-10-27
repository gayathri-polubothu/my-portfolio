import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '../contexts/ThemeContext';

export default function CertificationCarousel({ certifications }) {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!certifications || certifications.length === 0) {
    return (
      <div className={`text-center py-12 ${theme.textSecondary}`}>
        <p>No certifications available.</p>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? certifications.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === certifications.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentCert = certifications[currentIndex];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Main Carousel */}
      <div className={`relative ${theme.cardBg} rounded-2xl ${theme.shadow} overflow-hidden transition-colors ${theme.name === 'dark' ? 'border border-gray-700' : ''}`}>
        {/* Image Container */}
        <div className={`relative aspect-[4/3] ${theme.name === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
          <Image
            src={currentCert.image}
            alt={currentCert.title}
            fill
            className="object-contain"
            priority={currentIndex === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.name === 'light' ? 'bg-white/90 hover:bg-white text-gray-800' : 'bg-gray-800/90 hover:bg-gray-800 text-gray-100'} p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10`}
            aria-label="Previous certification"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme.name === 'light' ? 'bg-white/90 hover:bg-white text-gray-800' : 'bg-gray-800/90 hover:bg-gray-800 text-gray-100'} p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10`}
            aria-label="Next certification"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
            {currentIndex + 1} / {certifications.length}
          </div>
        </div>

        {/* Certification Info */}
        <div className="p-6 md:p-8">
          <h3 className={`text-2xl font-bold ${theme.text} mb-2 transition-colors`}>
            {currentCert.title}
          </h3>
          <p className={`text-lg ${theme.primaryText} font-medium mb-3 transition-colors`}>
            {currentCert.issuer}
          </p>
          
          {currentCert.issueDate && (
            <p className={`${theme.textSecondary} mb-3 transition-colors`}>
              <span className="font-semibold">Issued:</span> {currentCert.issueDate}
            </p>
          )}

          {currentCert.description && (
            <p className={`${theme.textSecondary} mb-4 transition-colors`}>
              {currentCert.description}
            </p>
          )}

          {currentCert.skills && currentCert.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {currentCert.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 ${theme.techBadgeBg} ${theme.techBadgeText} rounded-full text-sm font-medium transition-colors`}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {currentCert.credentialUrl && (
            <a
              href={currentCert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              View Credential
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="mt-6 flex justify-center gap-3 overflow-x-auto pb-4">
        {certifications.map((cert, index) => (
          <button
            key={cert._id || index}
            onClick={() => goToSlide(index)}
            className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all ${
              index === currentIndex
                ? 'ring-4 ring-primary-600 scale-110'
                : 'opacity-60 hover:opacity-100'
            }`}
            aria-label={`Go to ${cert.title}`}
          >
            <Image
              src={cert.image}
              alt={cert.title}
              fill
              className="object-cover"
              sizes="96px"
            />
          </button>
        ))}
      </div>

      {/* Dots Navigation (for mobile) */}
      <div className="mt-4 flex justify-center gap-2 md:hidden">
        {certifications.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-primary-600 w-8'
                : theme.name === 'light'
                ? 'bg-gray-300 hover:bg-gray-400'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

