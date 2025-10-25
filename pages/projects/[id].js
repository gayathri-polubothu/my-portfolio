import { useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '../../lib/dbConnect';
import Project from '../../models/Project';

// Dynamically import ImageModal (client-side only)
const ImageModal = dynamic(() => import('../../components/ImageModal'), {
  ssr: false,
});

export default function ProjectDetail({ project }) {
  const hasFeatures = project?.features && project.features.length > 0;
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const openModal = (imageIndex) => {
    setModalImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!project) {
    return (
      <Layout title="Project Not Found">
        <div className="min-h-screen flex items-center justify-center">
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

  // If the project has no features, show regular project view
  if (!hasFeatures) {
    return (
      <Layout title={`${project.title} | Gayathri Polubothu`}>
        <section className="py-20 bg-gray-50 min-h-screen">
          <div className="container-custom">
            <Link
              href="/projects"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-8"
            >
              ← Back to Projects
            </Link>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative w-full aspect-video bg-gray-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
              <div className="p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h1>
                <p className="text-lg text-gray-600 mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
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

  // Project with features view
  return (
    <Layout title={`${project.title} | Gayathri Polubothu`}>
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <Link
            href="/projects"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-8"
          >
            ← Back to Projects
          </Link>

          {/* Project Hero Section with Image */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="relative w-full aspect-video bg-gray-100">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Features Menu */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Features</h2>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index}>
                      <button
                        onClick={() => setSelectedFeature(index)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          selectedFeature === index
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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

            {/* Feature Details */}
            <div className="lg:col-span-3">
              {hasFeatures && project.features[selectedFeature] && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {project.features[selectedFeature].title}
                </h2>

                {/* Description as bullet points */}
                {project.features[selectedFeature].description &&
                  project.features[selectedFeature].description.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Key Highlights:
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {project.features[selectedFeature].description.map(
                          (item, idx) => (
                            <li key={idx}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {/* Images */}
                {project.features[selectedFeature].images &&
                  project.features[selectedFeature].images.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Screenshots:
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {project.features[selectedFeature].images.map(
                          (image, idx) => (
                            <button
                              key={idx}
                              onClick={() => openModal(idx)}
                              className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:scale-105 transition-all bg-gray-50 cursor-pointer group"
                            >
                              <div className="relative w-full aspect-[4/3]">
                                <Image
                                  src={image}
                                  alt={`${project.features[selectedFeature].title} screenshot ${idx + 1}`}
                                  fill
                                  className="object-contain"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                />
                                {/* Zoom Indicator */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-12 h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {isModalOpen && hasFeatures && project.features[selectedFeature]?.images && (
        <ImageModal
          images={project.features[selectedFeature].images}
          initialIndex={modalImageIndex}
          onClose={closeModal}
          altPrefix={project.features[selectedFeature].title}
        />
      )}
    </Layout>
  );
}

// Static generation - Generate paths at build time
export async function getStaticPaths() {
  try {
    await dbConnect();
    const projects = await Project.find({}).select('_id').lean();

    const paths = projects.map((project) => ({
      params: { id: project._id.toString() },
    }));

    return {
      paths,
      fallback: 'blocking', // Generate pages on-demand if not generated at build time
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

// Static generation - Fetch data at build time
export async function getStaticProps({ params }) {
  try {
    await dbConnect();
    const project = await Project.findById(params.id).lean();

    if (!project) {
      return {
        notFound: true,
        revalidate: 60, // Revalidate every 60 seconds
      };
    }

    // Deep serialize to convert all ObjectIds (including nested ones in features) to strings
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
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
      revalidate: 60,
    };
  }
}
