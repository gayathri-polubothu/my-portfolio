'use client';

import { useTheme } from '../contexts/ThemeContext';

export default function CustomResume() {
  const { theme } = useTheme();

  return (
    <div className={`max-w-5xl mx-auto ${theme.cardBg} rounded-2xl shadow-2xl overflow-hidden border ${theme.name === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
              <img
                src="https://res.cloudinary.com/db9baiycp/image/upload/v1761338342/IMG_1314_c9zf2z.jpg"
                alt="Gayathri Polubothu"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name and Title */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">GAYATHRI POLUBOTHU</h1>
            <h2 className="text-xl md:text-2xl font-light opacity-90 mb-6">Full Stack Developer</h2>
            
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>gayathri.polubothu@gmail.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>London, United Kingdom</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z" />
                </svg>
                <a href="https://github.com/gayathri-polubothu" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  github.com/gayathri-polubothu
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
                <a href="https://www.linkedin.com/in/gayathri-polubothu/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  linkedin.com/in/gayathri-polubothu
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-8 p-12">
        {/* Left Column */}
        <div className="md:col-span-1 space-y-8">
          {/* Profile Summary */}
          <section>
            <h3 className={`text-xl font-bold ${theme.primaryText} mb-4 pb-2 border-b-2 ${theme.name === 'light' ? 'border-blue-600' : 'border-purple-500'}`}>
              PROFILE
            </h3>
            <p className={`text-sm ${theme.textSecondary} leading-relaxed`}>
              Experienced Full Stack Developer with over 9 years of hands-on experience in frontend, backend, and full-stack development roles. 
              Skilled in building modern, scalable web applications using React.js, Angular, Node.js, and microservice-based architectures.
            </p>
          </section>

          {/* Skills */}
          <section>
            <h3 className={`text-xl font-bold ${theme.primaryText} mb-4 pb-2 border-b-2 ${theme.name === 'light' ? 'border-blue-600' : 'border-purple-500'}`}>
              SKILLS
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className={`text-sm font-semibold ${theme.text} mb-2`}>Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'Next.js', 'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind'].map((skill) => (
                    <span key={skill} className={`text-xs px-2 py-1 rounded ${theme.techBadgeBg} ${theme.techBadgeText}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className={`text-sm font-semibold ${theme.text} mb-2`}>Backend</h4>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Express', 'GraphQL', 'REST APIs', 'Microservices'].map((skill) => (
                    <span key={skill} className={`text-xs px-2 py-1 rounded ${theme.techBadgeBg} ${theme.techBadgeText}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className={`text-sm font-semibold ${theme.text} mb-2`}>Database & Cloud</h4>
                <div className="flex flex-wrap gap-2">
                  {['MongoDB', 'MySQL', 'AWS', 'Azure', 'Docker'].map((skill) => (
                    <span key={skill} className={`text-xs px-2 py-1 rounded ${theme.techBadgeBg} ${theme.techBadgeText}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Languages */}
          <section>
            <h3 className={`text-xl font-bold ${theme.primaryText} mb-4 pb-2 border-b-2 ${theme.name === 'light' ? 'border-blue-600' : 'border-purple-500'}`}>
              LANGUAGES
            </h3>
            <ul className={`space-y-2 text-sm ${theme.textSecondary}`}>
              <li className="flex justify-between">
                <span>English</span>
                <span className="font-semibold">Fluent</span>
              </li>
              <li className="flex justify-between">
                <span>Telugu</span>
                <span className="font-semibold">Native</span>
              </li>
              <li className="flex justify-between">
                <span>Hindi</span>
                <span className="font-semibold">Fluent</span>
              </li>
            </ul>
          </section>

          {/* Download Button */}
          <section>
            <a
              href="/Gayathri_Polubothu_CV.pdf"
              download
              className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Download PDF Resume
            </a>
          </section>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-8">
          {/* Work Experience */}
          <section>
            <h3 className={`text-2xl font-bold ${theme.primaryText} mb-6 pb-2 border-b-2 ${theme.name === 'light' ? 'border-blue-600' : 'border-purple-500'}`}>
              WORK EXPERIENCE
            </h3>
            
            <div className="space-y-6">
              {/* ZORO UK */}
              <div className="relative pl-8 pb-6 border-l-2 border-gray-300">
                <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full -ml-[9px]"></div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className={`text-lg font-bold ${theme.text}`}>ZORO UK</h4>
                    <p className={`${theme.primaryText} font-semibold`}>Full Stack Developer</p>
                  </div>
                  <span className={`text-sm ${theme.textTertiary} font-medium`}>2022 - PRESENT</span>
                </div>
                <ul className={`list-disc list-inside space-y-1 text-sm ${theme.textSecondary} mt-3`}>
                  <li>Developed and optimized e-commerce solutions enhancing user experience</li>
                  <li>Implemented proforma payment method on checkout/order pages end-to-end</li>
                  <li>Built microservice-based architectures for scalable applications</li>
                  <li>Led frontend development using React.js and Angular frameworks</li>
                  <li>Collaborated with cross-functional teams to deliver complex business workflows</li>
                </ul>
              </div>

              {/* Previous Experience */}
              <div className="relative pl-8 pb-6 border-l-2 border-gray-300">
                <div className="absolute left-0 top-0 w-4 h-4 bg-purple-600 rounded-full -ml-[9px]"></div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className={`text-lg font-bold ${theme.text}`}>Senior Software Developer</h4>
                    <p className={`${theme.primaryText} font-semibold`}>Various Organizations</p>
                  </div>
                  <span className={`text-sm ${theme.textTertiary} font-medium`}>2016 - 2022</span>
                </div>
                <ul className={`list-disc list-inside space-y-1 text-sm ${theme.textSecondary} mt-3`}>
                  <li>Architected and developed full-stack web applications using MEAN/MERN stack</li>
                  <li>Integrated RESTful and GraphQL APIs for seamless data flow</li>
                  <li>Optimized application performance and implemented best coding practices</li>
                  <li>Mentored junior developers and conducted code reviews</li>
                  <li>Contributed to agile development processes and sprint planning</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className={`text-2xl font-bold ${theme.primaryText} mb-6 pb-2 border-b-2 ${theme.name === 'light' ? 'border-blue-600' : 'border-purple-500'}`}>
              EDUCATION
            </h3>
            
            <div className="space-y-4">
              <div className="relative pl-8 border-l-2 border-gray-300 pb-4">
                <div className="absolute left-0 top-0 w-4 h-4 bg-green-600 rounded-full -ml-[9px]"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className={`text-lg font-bold ${theme.text}`}>Bachelor of Technology</h4>
                    <p className={`${theme.primaryText} font-semibold`}>Computer Science & Engineering</p>
                    <p className={`text-sm ${theme.textSecondary}`}>JNTU University</p>
                  </div>
                  <span className={`text-sm ${theme.textTertiary} font-medium`}>2012 - 2016</span>
                </div>
              </div>
            </div>
          </section>

          {/* Certifications Highlight */}
          <section>
            <h3 className={`text-2xl font-bold ${theme.primaryText} mb-6 pb-2 border-b-2 ${theme.name === 'light' ? 'border-blue-600' : 'border-purple-500'}`}>
              CERTIFICATIONS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'CSP104 - Secure Software Coding',
                'PCI102 - PCI Secure Software Lifecycle',
                'NOD101 - Defending Node.js',
                'Programming Foundations: Secure Coding'
              ].map((cert, idx) => (
                <div key={idx} className={`p-4 rounded-lg ${theme.name === 'light' ? 'bg-gray-50' : 'bg-gray-800'} border ${theme.name === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
                  <p className={`text-sm font-semibold ${theme.text}`}>✓ {cert}</p>
                </div>
              ))}
            </div>
            <a 
              href="/certifications"
              className={`inline-block mt-4 text-sm ${theme.primaryText} hover:underline font-semibold`}
            >
              View all certifications →
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}

