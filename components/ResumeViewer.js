'use client';

import { useState } from 'react';

export default function ResumeViewer({ pdfUrl = '/Gayathri_Polubothu_CV.pdf' }) {
  const [pdfError, setPdfError] = useState(false);

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
      {!pdfError ? (
        <div className="relative w-full bg-gray-100" style={{ minHeight: '900px' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400">Loading resume...</div>
          </div>
          <iframe
            src={`${pdfUrl}#view=FitH&toolbar=0&navpanes=0`}
            className="w-full h-full relative z-10"
            style={{ minHeight: '900px', border: 'none' }}
            title="Resume PDF Preview"
            onError={() => setPdfError(true)}
          />
        </div>
      ) : (
        <div className="p-16 text-center bg-gray-50">
          <div className="mb-8">
            <svg
              className="w-24 h-24 mx-auto text-blue-500"
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
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Resume Preview
          </h3>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            Use the buttons below to download or view the full resume in a new tab.
          </p>
        </div>
      )}

      {/* Action Buttons Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleDownload}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
          >
            <svg
              className="w-6 h-6 mr-3 group-hover:animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Resume
          </button>

          <button
            onClick={handleOpenNewPage}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
          >
            <svg
              className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Open in New Page
          </button>
        </div>
      </div>
    </div>
  );
}

