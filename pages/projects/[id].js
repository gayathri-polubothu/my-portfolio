import { useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '../../lib/dbConnect';
import Project from '../../models/Project';
import { useTheme } from '../../contexts/ThemeContext';

const ImageModal = dynamic(() => import('../../components/ImageModal'), {
  ssr: false,
});

export default function ProjectDetail({ project }) {
  const { theme } = useTheme();
  const hasFeatures = project?.features && project.features.length > 0;
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const openModal = (imageIndex) => {
    setModalImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  if (!project) {
    return (
      <Layout title="Project Not Found">
        <div className={`min-h-screen flex items-center justify-center ${theme.background}`}>
          <div className="text-center">
            <p className="text-red-600 text-xl mb-4">Project not found</p>
            <Link href="/projects" className="btn-primary">
              Back to Projects
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const ProjectHeader = () => (
    <div className={`${theme.cardBg} rounded-lg ${theme.shadow} overflow-hidden mb-4 ${theme.name === 'dark' ? 'border border-gray-700' : ''} transition-colors`}>
      <div className="px-4 sm:px-6 pt-4 pb-3">
        <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${theme.text} transition-colors`}>
          {project.title}
        </h1>
      </div>
      <div className={`relative w-full aspect-video ${theme.name === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary-500 to-primary-700 p-8">
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center">
              {project.title}
            </h2>
          </div>
        )}
      </div>
      <div className="px-4 sm:px-6 py-4">
        <p className={`text-base md:text-lg ${theme.textSecondary} mb-3 transition-colors`}>{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className={`px-3 py-1 ${theme.techBadgeBg} ${theme.techBadgeText} rounded-full text-sm transition-colors`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (!hasFeatures) {
    return (
      <Layout title={`${project.title} | Gayathri Polubothu`}>
        <section className={`py-4 md:py-6 ${theme.background} min-h-screen transition-colors`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/projects"
              className={theme.name === 'light'
                ? 'inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-4 transition-colors'
                : 'inline-flex items-center text-primary-400 hover:text-primary-300 font-medium mb-4 transition-colors'
              }
            >
              ← Back to Projects
            </Link>
            <div className={`${theme.cardBg} rounded-lg ${theme.shadow} overflow-hidden ${theme.name === 'dark' ? 'border border-gray-700' : ''} transition-colors`}>
              <div className="px-4 sm:px-6 pt-4 pb-3">
                <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${theme.text} transition-colors`}>
                  {project.title}
                </h1>
              </div>
              <div className={`relative w-full aspect-video ${theme.name === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary-500 to-primary-700 p-8">
                    <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center">
                      {project.title}
                    </h2>
                  </div>
                )}
              </div>
              <div className="px-4 sm:px-6 py-4">
                <p className={`text-base md:text-lg ${theme.textSecondary} mb-3 transition-colors`}>{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className={`px-3 py-1 ${theme.techBadgeBg} ${theme.techBadgeText} rounded-full text-sm transition-colors`}>
                      {tech}
                    </span>
                  ))}
                </div>
                
                {project.keyResponsibilities && project.keyResponsibilities.length > 0 && (
                  <div className="mb-4">
                    <h2 className={`text-xl md:text-2xl font-bold ${theme.text} mb-3 transition-colors`}>Key Responsibilities</h2>
                    <ul className={`list-disc list-inside space-y-2 ${theme.textSecondary} transition-colors`}>
                      {project.keyResponsibilities.map((responsibility, idx) => (
                        <li key={idx} className="text-sm md:text-base leading-relaxed">
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Live Demo →
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout title={`${project.title} | Gayathri Polubothu`}>
      <section className={`py-4 md:py-6 ${theme.background} min-h-screen transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className={theme.name === 'light'
              ? 'inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-4 transition-colors'
              : 'inline-flex items-center text-primary-400 hover:text-primary-300 font-medium mb-4 transition-colors'
            }
          >
            ← Back to Projects
          </Link>

          <ProjectHeader />

          <div className="grid lg:grid-cols-4 gap-4">
            <div className="lg:col-span-1">
              <div className={`${theme.cardBg} rounded-lg ${theme.shadow} p-4 sticky top-4 ${theme.name === 'dark' ? 'border border-gray-700' : ''} transition-colors`}>
                <h2 className={`text-lg font-bold ${theme.text} mb-3 transition-colors`}>Features</h2>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index}>
                      <button
                        onClick={() => setSelectedFeature(index)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                          selectedFeature === index
                            ? 'bg-primary-600 text-white'
                            : theme.name === 'light'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        }`}
                      >
                        <span className="block font-medium">
                          {index + 1}. {feature.title}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-3">
              {hasFeatures && project.features[selectedFeature] && (
                <div className={`${theme.cardBg} rounded-lg ${theme.shadow} p-4 md:p-6 ${theme.name === 'dark' ? 'border border-gray-700' : ''} transition-colors`}>
                  <h2 className={`text-xl md:text-2xl font-bold ${theme.text} mb-4 transition-colors`}>
                    {project.features[selectedFeature].title}
                  </h2>

                  {project.features[selectedFeature].description?.length > 0 && (
                    <div className="mb-6">
                      <h3 className={`text-base md:text-lg font-semibold ${theme.text} mb-2 transition-colors`}>
                        Key Highlights:
                      </h3>
                      <ul className={`list-disc list-inside space-y-1.5 ${theme.textSecondary} text-sm md:text-base transition-colors`}>
                        {project.features[selectedFeature].description.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.features[selectedFeature].images?.length > 0 && (
                    <div>
                      <h3 className={`text-base md:text-lg font-semibold ${theme.text} mb-3 transition-colors`}>
                        Screenshots:
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {project.features[selectedFeature].images.map((image, idx) => (
                          <button
                            key={idx}
                            onClick={() => openModal(idx)}
                            className={`rounded-lg overflow-hidden border ${theme.name === 'light' ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-800'} hover:shadow-xl hover:scale-105 transition-all cursor-pointer group`}
                          >
                            <div className="relative w-full aspect-[4/3]">
                              <Image
                                src={image}
                                alt={`${project.features[selectedFeature].title} screenshot ${idx + 1}`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && hasFeatures && project.features[selectedFeature]?.images && (
        <ImageModal
          images={project.features[selectedFeature].images}
          initialIndex={modalImageIndex}
          onClose={() => setIsModalOpen(false)}
          altPrefix={project.features[selectedFeature].title}
        />
      )}
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    await dbConnect();
    const projects = await Project.find({}).select('_id').lean();

    return {
      paths: projects.map((project) => ({
        params: { id: project._id.toString() },
      })),
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    await dbConnect();
    const project = await Project.findById(params.id).lean();

    if (!project) {
      return { notFound: true, revalidate: 60 };
    }

    const serializedProject = JSON.parse(JSON.stringify(project, (key, value) => {
      if (key === '_id' || key === 'id') {
        return value.toString();
      }
      return value;
    }));

    return {
      props: {
        project: {
          ...serializedProject,
          id: serializedProject._id,
          createdAt: new Date(serializedProject.createdAt).toISOString(),
          updatedAt: new Date(serializedProject.updatedAt).toISOString(),
        },
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true, revalidate: 60 };
  }
}
