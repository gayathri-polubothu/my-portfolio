'use client';

import { useState, useEffect } from 'react';

export default function ResumeViewer({ pdfUrl = '/Gayathri_Polubothu_CV.pdf' }) {
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    // Check if PDF is accessible
    fetch(pdfUrl, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          setShowIframe(true);
        }
      })
      .catch(() => {
        setShowIframe(false);
      });
  }, [pdfUrl]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Gayathri_Polubothu_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewPage = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
      {/* PDF Preview Section */}
      {showIframe ? (
        <div className="relative w-full bg-gray-100" style={{ minHeight: '900px' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400">Loading resume...</div>
          </div>
          <iframe
            src={`${pdfUrl}#view=FitH`}
            className="w-full h-full relative z-10"
            style={{ minHeight: '900px', border: 'none' }}
            title="Resume PDF Preview"
            onError={() => setShowIframe(false)}
          />
        </div>
      ) : (
        <div className="p-16 text-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="mb-8">
            <svg
              className="w-32 h-32 mx-auto text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            My Resume
          </h3>
          <p className="text-gray-600 text-lg mb-10 max-w-md mx-auto">
            Download or view my professional resume using the buttons below.
          </p>
        </div>
      )}

      {/* Action Buttons Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleOpenNewPage}
            className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto"
          >
            <svg
              className="w-7 h-7 mr-3 group-hover:rotate-12 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            View Resume
          </button>

          <button
            onClick={handleDownload}
            className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-blue-600 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto"
          >
            <svg
              className="w-7 h-7 mr-3 group-hover:animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Resume
          </button>
        </div>
        <p className="text-center text-white text-sm mt-4 opacity-90">
          Click "View Resume" to open the full PDF in a new tab
        </p>
      </div>
    </div>
  );
}

