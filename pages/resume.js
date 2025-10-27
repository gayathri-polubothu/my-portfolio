import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';

// Dynamically import ResumeViewer (client-side only for PDF and download interactions)
const ResumeViewer = dynamic(() => import('../components/ResumeViewer'), {
  loading: () => (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
      <div className="relative w-full bg-gray-100 flex items-center justify-center" style={{ minHeight: '900px' }}>
        <div className="text-gray-400">Loading resume viewer...</div>
      </div>
    </div>
  ),
  ssr: false,
});

export default function Resume() {
  const { theme } = useTheme();
  
  return (
    <Layout title="Resume | Gayathri Polubothu">
      <section className={`py-12 ${theme.background} min-h-screen transition-colors duration-300`}>
        <div className="container-custom max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className={`text-5xl md:text-6xl font-bold ${theme.text} mb-4 transition-colors`}>
              My Resume
            </h1>
            <p className={`text-xl ${theme.textSecondary} mb-6 transition-colors`}>
              Professional Curriculum Vitae
            </p>
            
            {/* Social Media Links */}
            <div className="flex flex-wrap gap-4 justify-center items-center mt-6 mb-2">
              <a
                href="https://www.linkedin.com/in/gayathri-polubothu/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>

              <a
                href="https://github.com/gayathri-polubothu"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-5 py-2.5 ${theme.name === 'light' ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-700 hover:bg-gray-600'} text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-medium`}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>

              <a
                href="https://www.zoro.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                ZORO UK
              </a>
            </div>
          </div>

          {/* Main Resume Display - Dynamically loaded */}
          <ResumeViewer />

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-md">
              <svg
                className="w-5 h-5 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-700 font-medium">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
