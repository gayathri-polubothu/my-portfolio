import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '../components/common/ProjectCard';
import dbConnect from '../lib/dbConnect';
import Project from '../models/Project';
import { useTheme } from '../contexts/ThemeContext';

export default function Home({ featuredProjects }) {
  const { theme } = useTheme();
  
  return (
    <Layout title="About | Gayathri Polubothu">
      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${theme.gradient} py-12 transition-colors duration-300`}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            {/* Profile Image */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="https://res.cloudinary.com/db9baiycp/image/upload/v1761338342/IMG_1314_c9zf2z.jpg"
                  alt="Gayathri Polubothu"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 128px, 160px"
                  unoptimized
                />
              </div>
            </div>
            <h1 className={`text-5xl md:text-6xl font-bold ${theme.text} mb-6 transition-colors`}>
              Hi, I'm{' '}
              <span className={theme.primaryText}>Gayathri Polubothu</span>
            </h1>
            <p className={`text-xl md:text-2xl ${theme.textSecondary} mb-8 transition-colors`}>
              Full Stack Developer | React | Next.js | Node.js | MongoDB
            </p>
            <div className={`text-lg ${theme.textSecondary} mb-12 text-left max-w-3xl mx-auto transition-colors`}>
              <p className={`mb-4 ${theme.textSecondary}`}>
                Experienced Full Stack Developer with over 9 years of hands-on experience in frontend, backend, and full-stack development roles. Skilled in building modern, scalable web applications using React.js, Angular, Node.js, and microservice-based architectures. Proficient in both RESTful and GraphQL API integrations, with a strong focus on performance, usability, and maintainable code.
              </p>
              <p className={`mb-4 ${theme.textSecondary}`}>
                Currently working at ZORO UK, where I contribute to developing and optimizing e-commerce solutions that enhance user experience and support complex business workflows.
              </p>
              <p className={`${theme.textSecondary} font-medium`}>
                Currently open to Fullstack, Frontend, and Backend Developer roles. Looking for full-time opportunities in London and happy to work in hybrid mode.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects" className="btn-primary">
                View My Work
              </Link>
              <Link href="/contact" className={`btn-secondary ${theme.buttonSecondary}`}>
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={`py-12 ${theme.cardBg} transition-colors duration-300`}>
        <div className="container-custom">
          <h2 className={`section-title text-center ${theme.text} transition-colors`}>Skills & Technologies</h2>
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
                className={`${theme.cardBg} rounded-lg ${theme.shadow} p-6 text-center hover:scale-105 transition-all ${theme.name === 'dark' ? 'border border-gray-700' : 'border border-gray-200'}`}
              >
                <p className={`font-semibold ${theme.text}`}>{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className={`py-12 ${theme.background} transition-colors duration-300`}>
        <div className="container-custom">
          <h2 className={`section-title text-center ${theme.text} transition-colors`}>Featured Projects</h2>

          {featuredProjects.length === 0 && (
            <p className={`text-center ${theme.textSecondary}`}>
              No featured projects yet. Check back soon!
            </p>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects" className="btn-primary inline-block">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-12 ${theme.primary} transition-colors duration-300`}>
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <Link
            href="/contact"
            className={`inline-block ${theme.cardBg} ${theme.primaryText} px-8 py-4 rounded-lg font-medium hover:opacity-90 transition-all`}
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
