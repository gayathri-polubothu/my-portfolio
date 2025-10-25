import dynamic from 'next/dynamic';
import Layout from '../components/Layout';

// Dynamically import the ContactForm component (client-side only)
const ContactForm = dynamic(() => import('../components/ContactForm'), {
  loading: () => (
    <div className="card">
      <div className="animate-pulse space-y-6">
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  ),
  ssr: false, // Disable SSR for this component
});

export default function Contact() {
  return (
    <Layout title="Contact | Gayathri Polubothu">
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <h1 className="section-title text-center">Get In Touch</h1>
            <p className="text-center text-gray-600 mb-12">
              Have a question or want to work together? Fill out the form below and I'll
              get back to you as soon as possible.
            </p>

            {/* Dynamically loaded ContactForm */}
            <ContactForm />

            {/* Contact Info */}
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Other Ways to Connect
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="mailto:gayathri.polubothu@gmail.com"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  📧 Email
                </a>
                <a
                  href="https://github.com/gayathri-polubothu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  🐙 GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/gayathri-polubothu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  💼 LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
