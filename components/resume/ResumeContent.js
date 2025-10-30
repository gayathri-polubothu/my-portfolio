import { memo } from 'react';
import Link from 'next/link';
import { useTheme } from '../../contexts/ThemeContext';
import SectionHeader from '../common/SectionHeader';

const workExperience = [
  {
    company: 'ZORO UK',
    position: 'Full Stack Developer',
    period: '2022 - PRESENT',
    color: 'bg-blue-600',
    responsibilities: [
      'Developed and optimized e-commerce solutions enhancing user experience',
      'Implemented proforma payment method on checkout/order pages end-to-end',
      'Built microservice-based architectures for scalable applications',
      'Led frontend development using React.js and Angular frameworks',
      'Collaborated with cross-functional teams to deliver complex business workflows',
      'Resolved production issues and provided IT support during quarterly maintenance cycles',
      'Managed bug fixes and ticket assignments to ensure system reliability'
    ]
  },
  {
    company: 'Various Organizations',
    position: 'Senior Software Developer',
    period: '2016 - 2022',
    color: 'bg-purple-600',
    responsibilities: [
      'Architected and developed full-stack web applications using MEAN/MERN stack',
      'Integrated RESTful and GraphQL APIs for seamless data flow',
      'Optimized application performance and implemented best coding practices',
      'Mentored junior developers and conducted code reviews',
      'Contributed to agile development processes and sprint planning'
    ]
  }
];

const certifications = [
  'CSP104 - Secure Software Coding',
  'PCI102 - PCI Secure Software Lifecycle',
  'NOD101 - Defending Node.js',
  'Programming Foundations: Secure Coding'
];

function ResumeContent() {
  const { theme } = useTheme();

  return (
    <div className="md:col-span-2 space-y-8">
      {/* Work Experience */}
      <section>
        <SectionHeader title="WORK EXPERIENCE" theme={theme} size="large" />
        
        <div className="space-y-6">
          {workExperience.map((job, index) => (
            <div key={index} className="relative pl-8 pb-6 border-l-2 border-gray-300">
              <div className={`absolute left-0 top-0 w-4 h-4 ${job.color} rounded-full -ml-[9px]`}></div>
              <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                <div>
                  <h4 className={`text-lg font-bold ${theme.text}`}>{job.company}</h4>
                  <p className={`${theme.primaryText} font-semibold`}>{job.position}</p>
                </div>
                <span className={`text-sm ${theme.textTertiary} font-medium`}>{job.period}</span>
              </div>
              <ul className={`list-disc list-inside space-y-1 text-sm ${theme.textSecondary} mt-3`}>
                {job.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <SectionHeader title="EDUCATION" theme={theme} size="large" />
        
        <div className="relative pl-8 border-l-2 border-gray-300 pb-4">
          <div className="absolute left-0 top-0 w-4 h-4 bg-green-600 rounded-full -ml-[9px]"></div>
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <h4 className={`text-lg font-bold ${theme.text}`}>Bachelor of Technology</h4>
              <p className={`${theme.primaryText} font-semibold`}>Computer Science & Engineering</p>
              <p className={`text-sm ${theme.textSecondary}`}>JNTU University</p>
            </div>
            <span className={`text-sm ${theme.textTertiary} font-medium`}>2012 - 2016</span>
          </div>
        </div>
      </section>

      {/* Certifications Highlight */}
      <section>
        <SectionHeader title="CERTIFICATIONS" theme={theme} size="large" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert, idx) => (
            <div key={idx} className={`p-4 rounded-lg ${theme.name === 'light' ? 'bg-gray-50' : 'bg-gray-800'} border ${theme.name === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
              <p className={`text-sm font-semibold ${theme.text}`}>✓ {cert}</p>
            </div>
          ))}
        </div>
        <Link 
          href="/certifications"
          className={`inline-block mt-4 text-sm ${theme.primaryText} hover:underline font-semibold`}
        >
          View all certifications →
        </Link>
      </section>
    </div>
  );
}

export default memo(ResumeContent);

