import Layout from '../components/Layout';
import CertificationCarousel from '../components/CertificationCarousel';
import dbConnect from '../lib/dbConnect';
import Certification from '../models/Certification';
import { useTheme } from '../contexts/ThemeContext';

export default function Certifications({ certifications }) {
  const { theme } = useTheme();
  
  return (
    <Layout title="Certifications | Gayathri Polubothu">
      <section className={`py-12 ${theme.background} min-h-screen transition-colors duration-300`}>
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className={`section-title ${theme.text} transition-colors`}>Professional Certifications</h1>
            <p className={`${theme.textSecondary} max-w-2xl mx-auto text-lg transition-colors`}>
              Showcasing my commitment to continuous learning and professional development
              through industry-recognized certifications and courses.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
            <div className={`${theme.cardBg} rounded-xl p-6 ${theme.shadow} text-center transition-colors ${theme.name === 'dark' ? 'border border-gray-700' : ''}`}>
              <div className={`text-4xl font-bold ${theme.primaryText} mb-2 transition-colors`}>
                {certifications.length}
              </div>
              <div className={`${theme.textSecondary} text-sm transition-colors`}>Certifications</div>
            </div>
            <div className={`${theme.cardBg} rounded-xl p-6 ${theme.shadow} text-center transition-colors ${theme.name === 'dark' ? 'border border-gray-700' : ''}`}>
              <div className={`text-4xl font-bold ${theme.primaryText} mb-2 transition-colors`}>
                {[...new Set(certifications.flatMap(c => c.skills))].length}
              </div>
              <div className={`${theme.textSecondary} text-sm transition-colors`}>Skills Covered</div>
            </div>
            <div className={`${theme.cardBg} rounded-xl p-6 ${theme.shadow} text-center transition-colors ${theme.name === 'dark' ? 'border border-gray-700' : ''}`}>
              <div className={`text-4xl font-bold ${theme.primaryText} mb-2 transition-colors`}>
                {new Set(certifications.map(c => c.issuer)).size}
              </div>
              <div className={`${theme.textSecondary} text-sm transition-colors`}>Organizations</div>
            </div>
            <div className={`${theme.cardBg} rounded-xl p-6 ${theme.shadow} text-center transition-colors ${theme.name === 'dark' ? 'border border-gray-700' : ''}`}>
              <div className={`text-4xl font-bold ${theme.primaryText} mb-2 transition-colors`}>
                {new Date().getFullYear() - 2020}+
              </div>
              <div className={`${theme.textSecondary} text-sm transition-colors`}>Years Learning</div>
            </div>
          </div>

          {/* Carousel */}
          <CertificationCarousel certifications={certifications} />

          {/* All Skills Section */}
          <div className="mt-16 text-center">
            <h2 className={`text-2xl font-bold ${theme.text} mb-6 transition-colors`}>
              Skills & Technologies Covered
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[...new Set(certifications.flatMap(c => c.skills))].sort().map((skill, idx) => (
                <span
                  key={idx}
                  className={`px-4 py-2 ${theme.techBadgeBg} ${theme.techBadgeText} rounded-lg text-sm font-medium ${theme.shadow} hover:shadow-md transition-all`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Grid View of All Certifications */}
          <div className="mt-16">
            <h2 className={`text-2xl font-bold ${theme.text} mb-8 text-center transition-colors`}>
              All Certifications
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert._id}
                  className={`${theme.cardBg} rounded-xl ${theme.shadow} hover:shadow-lg transition-all overflow-hidden ${theme.name === 'dark' ? 'border border-gray-700' : ''}`}
                >
                  <div className={`relative aspect-[4/3] ${theme.name === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className={`font-bold ${theme.text} mb-1 line-clamp-2 transition-colors`}>
                      {cert.title}
                    </h3>
                    <p className={`text-sm ${theme.primaryText} font-medium mb-2 transition-colors`}>
                      {cert.issuer}
                    </p>
                    {cert.issueDate && (
                      <p className={`text-xs ${theme.textTertiary} mb-2 transition-colors`}>
                        {cert.issueDate}
                      </p>
                    )}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 ${theme.techBadgeBg} ${theme.techBadgeText} rounded text-xs transition-colors`}
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className={`px-2 py-1 ${theme.textTertiary} text-xs transition-colors`}>
                            +{cert.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
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
    const certifications = await Certification.find({}).sort({ order: 1, createdAt: -1 }).lean();

    // Serialize the data
    const serializedCertifications = JSON.parse(JSON.stringify(certifications, (key, value) => {
      if (key === '_id' || key === 'id') {
        return value.toString();
      }
      return value;
    })).map((cert) => ({
      ...cert,
      _id: cert._id,
      createdAt: new Date(cert.createdAt).toISOString(),
      updatedAt: new Date(cert.updatedAt).toISOString(),
    }));

    return {
      props: {
        certifications: serializedCertifications,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return {
      props: {
        certifications: [],
      },
      revalidate: 60,
    };
  }
}

