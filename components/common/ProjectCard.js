import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../../contexts/ThemeContext';

export default function ProjectCard({ project }) {
  const { theme } = useTheme();

  return (
    <div 
      className={`${theme.cardBg} rounded-lg ${theme.shadow} p-6 hover:shadow-lg transition-all duration-300 group border-2 ${
        theme.name === 'dark' 
          ? 'border-gray-700 hover:border-blue-400 focus-within:border-blue-400' 
          : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-400'
      } hover:scale-[1.02] active:scale-[0.99] cursor-pointer`}
      tabIndex="0"
      role="article"
      aria-label={`Project: ${project.title}`}
    >
      {/* Title and Featured Badge */}
      <div className="flex items-start justify-between gap-2 mb-4">
        <Link href={`/projects/${project.id}`}>
          <h3 
            className={
              theme.name === 'light'
                ? 'text-xl font-bold text-gray-900 flex-1 hover:text-primary-600 transition-colors cursor-pointer'
                : 'text-xl font-bold text-gray-100 flex-1 hover:text-primary-400 transition-colors cursor-pointer'
            }
          >
            {project.title}
          </h3>
        </Link>
        {project.featured && (
          <span className={`${theme.primary} text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap`}>
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Project Image */}
      <Link href={`/projects/${project.id}`}>
        <div 
          className={`relative overflow-hidden rounded-lg mb-4 cursor-pointer aspect-video ${
            theme.name === 'light' ? 'bg-gray-100' : 'bg-gray-700'
          }`}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary-500 to-primary-700 p-6">
              <h3 className="text-white text-xl md:text-2xl font-bold text-center">
                {project.title}
              </h3>
            </div>
          )}
        </div>
      </Link>

      {/* Description */}
      <p className={`${theme.textSecondary} mb-4 line-clamp-3 transition-colors`}>
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech) => (
          <span 
            key={tech} 
            className={`px-3 py-1 ${theme.techBadgeBg} ${theme.techBadgeText} rounded-full text-sm transition-colors`}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4 flex-wrap">
        <Link
          href={`/projects/${project.id}`}
          className={
            theme.name === 'light'
              ? 'text-primary-600 hover:text-primary-700 font-medium transition-colors'
              : 'text-primary-400 hover:text-primary-300 font-medium transition-colors'
          }
        >
          View Details →
        </Link>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={
              theme.name === 'light'
                ? 'text-gray-600 hover:text-gray-900 font-medium transition-colors inline-flex items-center gap-1'
                : 'text-gray-300 hover:text-gray-100 font-medium transition-colors inline-flex items-center gap-1'
            }
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={
              theme.name === 'light'
                ? 'text-gray-600 hover:text-gray-900 font-medium transition-colors inline-flex items-center gap-1'
                : 'text-gray-300 hover:text-gray-100 font-medium transition-colors inline-flex items-center gap-1'
            }
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}

