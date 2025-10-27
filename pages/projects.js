import { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '../lib/dbConnect';
import Project from '../models/Project';
import { useTheme } from '../contexts/ThemeContext';

export default function Projects({ projects, allTechnologies }) {
  const [filter, setFilter] = useState('all');
  const { theme } = useTheme();

  const filterProjects = (projects) => {
    if (!projects) return [];
    if (filter === 'all') return projects;
    if (filter === 'featured') return projects.filter((p) => p.featured);
    return projects.filter((p) => p.tech.includes(filter));
  };

  const FilterButton = ({ value, label }) => {
    const isActive = filter === value;
    return (
      <button
        onClick={() => setFilter(value)}
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
          <h1 className={`section-title text-center ${theme.text} transition-colors`}>My Projects</h1>
          <p className={`text-center ${theme.textSecondary} mb-12 max-w-2xl mx-auto transition-colors`}>
            Showcasing 9+ years of full-stack development experience across diverse industries,
            from e-commerce platforms to IoT solutions.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <FilterButton value="all" label="All" />
            <FilterButton value="featured" label="Featured" />
            {allTechnologies.slice(0, 5).map((tech) => (
              <FilterButton key={tech} value={tech} label={tech} />
            ))}
          </div>

          {filterProjects(projects).length === 0 ? (
            <div className={`text-center ${theme.textSecondary}`}>
              <p>No projects found for this filter.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filterProjects(projects).map((project) => (
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
          )}
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
