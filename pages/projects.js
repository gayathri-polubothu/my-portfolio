import { useState } from 'react';
import Layout from '../components/Layout';
import ProjectCard from '../components/common/ProjectCard';
import dbConnect from '../lib/dbConnect';
import Project from '../models/Project';
import { useTheme } from '../contexts/ThemeContext';

export default function Projects({ professionalProjects, personalProjects, allTechnologies }) {
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const { theme } = useTheme();

  const filterProjects = (projects) => {
    if (!projects) return [];
    if (filter === 'all') return projects;
    if (filter === 'featured') return projects.filter((p) => p.featured);
    return projects.filter((p) => p.tech.includes(filter));
  };

  const filteredProfessionalProjects = filterProjects(professionalProjects);
  const displayProjects = showAll ? filteredProfessionalProjects : filteredProfessionalProjects.slice(0, 5);
  const hasMoreProjects = filteredProfessionalProjects.length > 5;

  const FilterButton = ({ value, label }) => {
    const isActive = filter === value;
    return (
      <button
        onClick={() => {
          setFilter(value);
          setShowAll(false);
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
          {/* Professional Experience Section */}
          <h1 className={`section-title text-center ${theme.text} transition-colors`}>Professional Experience</h1>
          <p className={`text-center ${theme.textSecondary} mb-12 max-w-2xl mx-auto transition-colors`}>
            Showcasing 9+ years of full-stack development experience across diverse industries,
            from e-commerce platforms to IoT solutions. Currently open to Fullstack, Frontend, and Backend Developer roles.
            Looking for full-time opportunities in London, happy to work in hybrid mode.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <FilterButton value="all" label="All" />
            <FilterButton value="featured" label="Featured" />
            {allTechnologies.slice(0, 5).map((tech) => (
              <FilterButton key={tech} value={tech} label={tech} />
            ))}
          </div>

          {/* Professional Projects Grid */}
          {filteredProfessionalProjects.length === 0 ? (
            <div className={`text-center ${theme.textSecondary}`}>
              <p>No projects found for this filter.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              
              {/* Load More Button */}
              {hasMoreProjects && !showAll && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setShowAll(true)}
                    className="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Load More Projects ({filteredProfessionalProjects.length - 5} more)
                  </button>
                </div>
              )}
            </>
          )}

          {/* Personal Projects Section */}
          {personalProjects.length > 0 && (
            <div className="mt-20">
              <h2 className={`text-3xl font-bold text-center ${theme.text} mb-8 transition-colors`}>
                Personal Projects
              </h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {personalProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
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

    // Separate professional and personal projects
    const professionalProjects = serializedProjects.filter(
      (p) => p.projectType === 'professional' || !p.projectType
    );
    const personalProjects = serializedProjects.filter(
      (p) => p.projectType === 'personal'
    );

    // Get all technologies from professional projects only
    const allTechnologies = [...new Set(professionalProjects.flatMap((p) => p.tech))];

    return {
      props: {
        professionalProjects,
        personalProjects,
        allTechnologies,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return {
      props: {
        professionalProjects: [],
        personalProjects: [],
        allTechnologies: [],
      },
      revalidate: 60,
    };
  }
}
