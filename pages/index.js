import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '../lib/dbConnect';
import Project from '../models/Project';

export default function Home({ featuredProjects }) {
  return (
    <Layout title="About | Gayathri Polubothu">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            {/* Profile Image */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="/MyImage/profile.png"
                  alt="Gayathri Polubothu"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Hi, I'm{' '}
              <span className="text-primary-600">Gayathri Polubothu</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Full Stack Developer | React | Next.js | Node.js | MongoDB
            </p>
            <div className="text-lg text-gray-600 mb-12 text-left max-w-3xl mx-auto">
              <p className="mb-4">
                Experienced Full Stack Developer with over 9 years of hands-on experience in frontend, backend, and full-stack development roles. Skilled in building modern, scalable web applications using React.js, Angular, Node.js, and microservice-based architectures. Proficient in both RESTful and GraphQL API integrations, with a strong focus on performance, usability, and maintainable code.
              </p>
              <p>
                Currently working at ZORO UK, where I contribute to developing and optimizing e-commerce solutions that enhance user experience and support complex business workflows.
              </p>
            </div>
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

          {featuredProjects.length === 0 && (
            <p className="text-center text-gray-600">
              No featured projects yet. Check back soon!
            </p>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="card group">
                <Link href={`/projects/${project.id}`}>
                  <div className="relative overflow-hidden rounded-lg mb-4 aspect-video bg-gray-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <span className="absolute top-3 right-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-10">
                      ⭐ Featured
                    </span>
                  </div>
                </Link>
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

// Static generation at build time
export async function getStaticProps() {
  try {
    await dbConnect();
    const projects = await Project.find({ featured: true }).sort({ order: 1 }).lean();

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

    return {
      props: {
        featuredProjects: serializedProjects,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return {
      props: {
        featuredProjects: [],
      },
      revalidate: 60,
    };
  }
}
