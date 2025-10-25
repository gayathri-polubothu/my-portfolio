import { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '../lib/dbConnect';
import Project from '../models/Project';

export default function Projects({ projects, allTechnologies }) {
  const [filter, setFilter] = useState('all');

  const filterProjects = (projects) => {
    if (!projects) return [];
    if (filter === 'all') return projects;
    if (filter === 'featured') return projects.filter((p) => p.featured);
    return projects.filter((p) => p.tech.includes(filter));
  };

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

          {/* Projects Grid */}
          {filterProjects(projects).length === 0 ? (
            <div className="text-center text-gray-600">
              <p>No projects found for this filter.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filterProjects(projects).map((project) => (
                <div key={project.id} className="card group">
                  <Link href={`/projects/${project.id}`}>
                    <div className="relative overflow-hidden rounded-lg mb-4 cursor-pointer aspect-video bg-gray-100">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {project.featured && (
                        <span className="absolute top-3 right-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-10">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Link href={`/projects/${project.id}`}>
                      <h3 className="text-xl font-bold text-gray-900 flex-1 hover:text-primary-600 transition-colors cursor-pointer">
                        {project.title}
                      </h3>
                    </Link>
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
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View Details →
                    </Link>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-700 font-medium"
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
                        className="text-gray-600 hover:text-gray-700 font-medium"
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

// Static generation at build time
export async function getStaticProps() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();

    // Deep serialize to convert all ObjectIds to strings
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
      revalidate: 3600, // Revalidate every hour
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
