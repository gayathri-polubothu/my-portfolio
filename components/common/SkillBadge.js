import { memo } from 'react';

function SkillBadge({ skills, theme, size = 'default' }) {
  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    default: 'text-sm px-3 py-1.5',
    large: 'text-base px-4 py-2'
  };

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span 
          key={skill} 
          className={`${sizeClasses[size]} rounded ${theme.techBadgeBg} ${theme.techBadgeText} font-medium transition-colors`}
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

export default memo(SkillBadge);

