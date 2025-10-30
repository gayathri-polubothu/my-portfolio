import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import SocialLinks from '../components/common/SocialLinks';
import { useTheme } from '../contexts/ThemeContext';

// Dynamically import CustomResume for better performance
const CustomResume = dynamic(() => import('../components/CustomResume'), {
  ssr: true
});

export default function Resume() {
  const { theme } = useTheme();
  
  return (
    <Layout title="Resume | Gayathri Polubothu">
      <section className={`py-12 ${theme.background} min-h-screen transition-colors duration-300`}>
        <div className="container-custom max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className={`text-5xl md:text-6xl font-bold ${theme.text} mb-4 transition-colors`}>
              My Resume
            </h1>
            <p className={`text-xl ${theme.textSecondary} mb-6 transition-colors`}>
              Professional Experience & Qualifications
            </p>
            
            <SocialLinks className="mt-6 mb-8" />
          </div>

          {/* Custom Resume Component */}
          <CustomResume />

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className={`inline-flex items-center px-6 py-3 ${theme.cardBg} rounded-full shadow-md transition-colors`}>
              <svg
                className={`w-5 h-5 mr-2 ${theme.primaryText}`}
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
              <p className={`${theme.text} font-medium transition-colors`}>
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
