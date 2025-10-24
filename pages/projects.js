import { useState } from 'react';
import Layout from '../components/Layout';
import { gql, useQuery } from '@apollo/client';

const PROJECTS_QUERY = gql`
  query Projects {
    projects {
      id
      title
      description
      image
      tech
      demoUrl
      githubUrl
      featured
    }
  }
`;

export default function Projects() {
  const { data, loading, error } = useQuery(PROJECTS_QUERY);
  const [filter, setFilter] = useState('all');

  const filterProjects = (projects) => {
    if (!projects) return [];
    if (filter === 'all') return projects;
    if (filter === 'featured') return projects.filter((p) => p.featured);
    return projects.filter((p) => p.tech.includes(filter));
  };

  const allTechnologies = data?.projects
    ? [...new Set(data.projects.flatMap((p) => p.tech))]
    : [];

  return (
    <Layout title="Projects | Gayathri Polubothu">
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <h1 className="section-title text-center">My Projects</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Showcasing 9+ years of full-stack development experience across diverse industries,
            from e-commerce platforms to IoT solutions.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'featured'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Featured
            </button>
            {allTechnologies.slice(0, 5).map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === tech
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600">Loading projects...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center text-red-600 bg-red-50 p-6 rounded-lg">
              <p className="font-semibold">Error loading projects</p>
              <p className="text-sm mt-2">{error.message}</p>
            </div>
          )}

          {/* Projects Grid */}
          {data && (
            <>
              {filterProjects(data.projects).length === 0 ? (
                <div className="text-center text-gray-600">
                  <p>No projects found for this filter.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filterProjects(data.projects).map((project) => (
                    <div key={project.id} className="card group">
                      <div className="relative overflow-hidden rounded-lg mb-4">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {project.featured && (
                          <span className="absolute top-3 right-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                            ⭐ Featured
                          </span>
                        )}
                      </div>

                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 flex-1">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Live Demo →
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-700 font-medium"
                          >
                            GitHub →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

