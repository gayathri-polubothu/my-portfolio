import { useState } from 'react';
import Layout from '../components/Layout';
import { gql, useMutation } from '@apollo/client';

const CREATE_CONTACT_MUTATION = gql`
  mutation CreateContact($name: String!, $email: String!, $message: String!) {
    createContact(name: $name, email: $email, message: $message) {
      id
      name
      email
      message
      createdAt
    }
  }
`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [createContact, { loading, error }] = useMutation(CREATE_CONTACT_MUTATION);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    try {
      await createContact({
        variables: formData,
      });

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <Layout title="Contact | My Portfolio">
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <h1 className="section-title text-center">Get In Touch</h1>
            <p className="text-center text-gray-600 mb-12">
              Have a question or want to work together? Fill out the form below and I'll
              get back to you as soon as possible.
            </p>

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-center font-medium">
                  ✓ Message sent successfully! I'll get back to you soon.
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-center font-medium">
                  ✗ Error sending message. Please try again.
                </p>
              </div>
            )}

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="card">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Other Ways to Connect
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="mailto:your.email@example.com"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  📧 Email
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  🐙 GitHub
                </a>
                <a
                  href="https://linkedin.com"
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

