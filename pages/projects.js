import { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '../lib/dbConnect';
import Project from '../models/Project';
import { useTheme } from '../contexts/ThemeContext';

export default function Projects({ projects, allTechnologies }) {
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const { theme } = useTheme();

  const filterProjects = (projects) => {
    if (!projects) return [];
    if (filter === 'all') return projects;
    if (filter === 'featured') return projects.filter((p) => p.featured);
    return projects.filter((p) => p.tech.includes(filter));
  };

  const filteredProjects = filterProjects(projects);
  const displayProjects = showAll ? filteredProjects : filteredProjects.slice(0, 5);
  const hasMoreProjects = filteredProjects.length > 5;

  const FilterButton = ({ value, label }) => {
    const isActive = filter === value;
    return (
      <button
        onClick={() => {
          setFilter(value);
          setShowAll(false); // Reset to show only 5 projects when filter changes
        }}
        className={`px-4 py-2 rounded-lg font-medium transition-all border ${
          isActive
            ? 'bg-primary-600 text-white border-primary-600 hover:bg-primary-700'
            : theme.name === 'light'
            ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <Layout title="Projects | Gayathri Polubothu">
      <section className={`py-12 ${theme.background} min-h-screen transition-colors duration-300`}>
        <div className="container-custom">
          <h1 className={`section-title text-center ${theme.text} transition-colors`}>Professional Experience</h1>
          <p className={`text-center ${theme.textSecondary} mb-12 max-w-2xl mx-auto transition-colors`}>
            Showcasing 9+ years of full-stack development experience across diverse industries,
            from e-commerce platforms to IoT solutions. Currently open to Fullstack, Frontend, and Backend Developer roles.
            Looking for full-time opportunities in London, happy to work in hybrid mode.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <FilterButton value="all" label="All" />
            <FilterButton value="featured" label="Featured" />
            {allTechnologies.slice(0, 5).map((tech) => (
              <FilterButton key={tech} value={tech} label={tech} />
            ))}
          </div>

          {filteredProjects.length === 0 ? (
            <div className={`text-center ${theme.textSecondary}`}>
              <p>No projects found for this filter.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayProjects.map((project) => (
                <div key={project.id} className={`${theme.cardBg} rounded-lg ${theme.shadow} p-6 hover:shadow-lg transition-all group ${theme.name === 'dark' ? 'border border-gray-700' : ''}`}>
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <Link href={`/projects/${project.id}`}>
                      <h3 className={theme.name === 'light'
                        ? 'text-xl font-bold text-gray-900 flex-1 hover:text-primary-600 transition-colors cursor-pointer'
                        : 'text-xl font-bold text-gray-100 flex-1 hover:text-primary-400 transition-colors cursor-pointer'
                      }>
                        {project.title}
                      </h3>
                    </Link>
                    {project.featured && (
                      <span className={`${theme.primary} text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap`}>
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  <Link href={`/projects/${project.id}`}>
                    <div className={`relative overflow-hidden rounded-lg mb-4 cursor-pointer aspect-video ${theme.name === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
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

                  <p className={`${theme.textSecondary} mb-4 line-clamp-3 transition-colors`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className={`px-3 py-1 ${theme.techBadgeBg} ${theme.techBadgeText} rounded-full text-sm transition-colors`}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Link
                      href={`/projects/${project.id}`}
                      className={theme.name === 'light' 
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
                        className={theme.name === 'light'
                          ? 'text-gray-600 hover:text-gray-900 font-medium transition-colors'
                          : 'text-gray-300 hover:text-gray-100 font-medium transition-colors'
                        }
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live Demo →
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={theme.name === 'light'
                          ? 'text-gray-600 hover:text-gray-900 font-medium transition-colors'
                          : 'text-gray-300 hover:text-gray-100 font-medium transition-colors'
                        }
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
                ))}
              </div>
              
              {/* Load More Button */}
              {hasMoreProjects && !showAll && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setShowAll(true)}
                    className="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Load More Projects ({filteredProjects.length - 5} more)
                  </button>
                </div>
              )}
            </>
          )}

          {/* Personal Projects Section */}
          <div className="mt-16">
            <h2 className={`text-3xl font-bold text-center ${theme.text} mb-8 transition-colors`}>Personal Projects</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Portfolio Project */}
              <div className={`${theme.cardBg} rounded-lg ${theme.shadow} p-6 hover:shadow-lg transition-all ${theme.name === 'dark' ? 'border border-gray-700' : ''}`}>
                <h3 className={`text-xl font-bold ${theme.text} mb-4 transition-colors`}>
                  My Portfolio
                </h3>
                <div className={`relative overflow-hidden rounded-lg mb-4 aspect-video ${theme.name === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary-500 to-primary-700 p-6">
                    <h3 className="text-white text-xl md:text-2xl font-bold text-center">
                      Portfolio Website
                    </h3>
                  </div>
                </div>
                <p className={`${theme.textSecondary} mb-4 transition-colors`}>
                  A modern, responsive portfolio website showcasing my professional experience, projects, and skills. 
                  Built with Next.js, React, and Tailwind CSS with dark mode support.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Next.js', 'React', 'Tailwind CSS', 'MongoDB'].map((tech) => (
                    <span key={tech} className={`px-3 py-1 ${theme.techBadgeBg} ${theme.techBadgeText} rounded-full text-sm transition-colors`}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href="/"
                    className={theme.name === 'light' 
                      ? 'text-primary-600 hover:text-primary-700 font-medium transition-colors'
                      : 'text-primary-400 hover:text-primary-300 font-medium transition-colors'
                    }
                  >
                    View Live →
                  </a>
                  <a
                    href="https://github.com/gayathri-polubothu/my-portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={theme.name === 'light'
                      ? 'text-gray-600 hover:text-gray-900 font-medium transition-colors'
                      : 'text-gray-300 hover:text-gray-100 font-medium transition-colors'
                    }
                  >
                    GitHub →
                  </a>
                </div>
              </div>

              {/* My Recipes Application */}
              <div className={`${theme.cardBg} rounded-lg ${theme.shadow} p-6 hover:shadow-lg transition-all ${theme.name === 'dark' ? 'border border-gray-700' : ''}`}>
                <h3 className={`text-xl font-bold ${theme.text} mb-4 transition-colors`}>
                  My Recipes Application
                </h3>
                <div className={`relative overflow-hidden rounded-lg mb-4 aspect-video ${theme.name === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-500 to-blue-600 p-6">
                    <h3 className="text-white text-xl md:text-2xl font-bold text-center">
                      Recipe Manager
                    </h3>
                  </div>
                </div>
                <p className={`${theme.textSecondary} mb-4 transition-colors`}>
                  A full-stack MERN recipe management application with user authentication, recipe creation, favorites, and search functionality. 
                  Built with Next.js, Material UI, MongoDB, Express, and Node.js, featuring OAuth integration and Elastic Search.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'Material UI'].map((tech) => (
                    <span key={tech} className={`px-3 py-1 ${theme.techBadgeBg} ${theme.techBadgeText} rounded-full text-sm transition-colors`}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://nextjs-mern-recipes-app.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={theme.name === 'light' 
                      ? 'text-primary-600 hover:text-primary-700 font-medium transition-colors'
                      : 'text-primary-400 hover:text-primary-300 font-medium transition-colors'
                    }
                  >
                    Live Demo →
                  </a>
                  <a
                    href="https://github.com/gayathri-polubothu/mern-recipes-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={theme.name === 'light'
                      ? 'text-gray-600 hover:text-gray-900 font-medium transition-colors'
                      : 'text-gray-300 hover:text-gray-100 font-medium transition-colors'
                    }
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();

    const serializedProjects = JSON.parse(JSON.stringify(projects, (key, value) => {
      if (key === '_id' || key === 'id') {
        return value.toString();
      }
      return value;
    })).map((project) => ({
      ...project,
      id: project._id,
      createdAt: new Date(project.createdAt).toISOString(),
      updatedAt: new Date(project.updatedAt).toISOString(),
    }));

    const allTechnologies = [...new Set(serializedProjects.flatMap((p) => p.tech))];

    return {
      props: {
        projects: serializedProjects,
        allTechnologies,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return {
      props: {
        projects: [],
        allTechnologies: [],
      },
      revalidate: 60,
    };
  }
}
