import { memo } from 'react';

function SectionHeader({ title, theme, size = 'default', className = '' }) {
  const sizeClasses = {
    small: 'text-lg',
    default: 'text-xl',
    large: 'text-2xl'
  };

  return (
    <h3 className={`${sizeClasses[size]} font-bold ${theme.primaryText} mb-4 pb-2 border-b-2 ${theme.name === 'light' ? 'border-blue-600' : 'border-purple-500'} ${className}`}>
      {title}
    </h3>
  );
}

export default memo(SectionHeader);

