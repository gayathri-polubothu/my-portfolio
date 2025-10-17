import Layout from '../components/Layout';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';

const FEATURED_PROJECTS_QUERY = gql`
  query FeaturedProjects {
    featuredProjects {
      id
      title
      description
      image
      tech
      demoUrl
      githubUrl
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(FEATURED_PROJECTS_QUERY);

  return (
    <Layout title="Home | My Portfolio">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Hi, I'm{' '}
              <span className="text-primary-600">Your Name</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Full Stack Developer | React | Next.js | Node.js | MongoDB
            </p>
            <p className="text-lg text-gray-600 mb-12">
              I build modern web applications with clean code and beautiful design.
              Passionate about creating exceptional user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects" className="btn-primary">
                View My Work
              </Link>
              <Link href="/contact" className="btn-secondary">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center">Skills & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              'React',
              'Next.js',
              'Node.js',
              'MongoDB',
              'GraphQL',
              'Tailwind CSS',
              'TypeScript',
              'Git',
            ].map((skill) => (
              <div
                key={skill}
                className="card text-center hover:scale-105 transition-transform"
              >
                <p className="font-semibold text-gray-800">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center">Featured Projects</h2>

          {loading && (
            <p className="text-center text-gray-600">Loading projects...</p>
          )}

          {error && (
            <p className="text-center text-red-600">
              Error loading projects. Please try again later.
            </p>
          )}

          {data && data.featuredProjects.length === 0 && (
            <p className="text-center text-gray-600">
              No featured projects yet. Check back soon!
            </p>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.featuredProjects?.map((project) => (
              <div key={project.id} className="card">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
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

          <div className="text-center mt-12">
            <Link href="/projects" className="btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </Layout>
  );
}

