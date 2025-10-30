import { useTheme } from '../contexts/ThemeContext';
import ResumeHeader from './resume/ResumeHeader';
import ResumeSidebar from './resume/ResumeSidebar';
import ResumeContent from './resume/ResumeContent';

export default function CustomResume() {
  const { theme } = useTheme();

  return (
    <div className={`max-w-5xl mx-auto ${theme.cardBg} rounded-2xl shadow-2xl overflow-hidden border ${theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
      <ResumeHeader />
      
      <div className="grid md:grid-cols-3 gap-8 p-12">
        <ResumeSidebar />
        <ResumeContent />
      </div>
    </div>
  );
}
