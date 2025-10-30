import { memo } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { SKILLS, PERSONAL_INFO } from '../../lib/constants';
import SectionHeader from '../common/SectionHeader';
import SkillBadge from '../common/SkillBadge';

function ResumeSidebar() {
  const { theme } = useTheme();

  return (
    <div className="md:col-span-1 space-y-8">
      {/* Profile Summary */}
      <section>
        <SectionHeader title="PROFILE" theme={theme} />
        <p className={`text-sm ${theme.textSecondary} leading-relaxed`}>
          Experienced Full Stack Developer with over 9 years of hands-on experience in frontend, backend, and full-stack development roles. 
          Skilled in building modern, scalable web applications using React.js, Angular, Node.js, and microservice-based architectures.
        </p>
      </section>

      {/* Skills */}
      <section>
        <SectionHeader title="SKILLS" theme={theme} />
        <div className="space-y-3">
          <div>
            <h4 className={`text-sm font-semibold ${theme.text} mb-2`}>Frontend</h4>
            <SkillBadge skills={SKILLS.frontend} theme={theme} size="small" />
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${theme.text} mb-2`}>Backend</h4>
            <SkillBadge skills={SKILLS.backend} theme={theme} size="small" />
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${theme.text} mb-2`}>Database & Cloud</h4>
            <SkillBadge skills={SKILLS.database} theme={theme} size="small" />
          </div>
          {SKILLS.IOT && (
            <div>
              <h4 className={`text-sm font-semibold ${theme.text} mb-2`}>IoT</h4>
              <SkillBadge skills={SKILLS.IOT} theme={theme} size="small" />
            </div>
          )}
          {SKILLS.eventdriven && (
            <div>
              <h4 className={`text-sm font-semibold ${theme.text} mb-2`}>Event-Driven Architecture</h4>
              <SkillBadge skills={SKILLS.eventdriven} theme={theme} size="small" />
            </div>
          )}
        </div>
      </section>

      {/* Languages */}
      <section>
        <SectionHeader title="LANGUAGES" theme={theme} />
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
          href={PERSONAL_INFO.resumePDF}
          download
          className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          Download PDF Resume
        </a>
      </section>
    </div>
  );
}

export default memo(ResumeSidebar);

