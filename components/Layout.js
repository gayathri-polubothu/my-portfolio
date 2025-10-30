import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

export default function Layout({ children, title = 'My Portfolio' }) {
  const router = useRouter();
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'About', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => router.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={`min-h-screen flex flex-col ${theme.background} transition-colors duration-300`}>
        {/* Navigation */}
        <nav className={`${theme.navBg} ${theme.shadow} sticky top-0 z-50 transition-colors duration-300`}>
          <div className="container-custom">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link 
                href="/" 
                className={`text-xl font-bold ${theme.primaryText} transition-colors hover:opacity-80`}
                onClick={closeMobileMenu}
              >
                Gayathri Polubothu
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <ul className="flex space-x-8">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        className={`font-medium transition-colors ${
                          isActive(item.path)
                            ? theme.primaryText
                            : theme.name === 'light'
                            ? 'text-gray-600 hover:text-primary-600'
                            : 'text-gray-300 hover:text-primary-400'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button & Theme Toggle */}
              <div className="md:hidden flex items-center space-x-4">
                <ThemeToggle />
                <button
                  onClick={toggleMobileMenu}
                  className={`p-2 rounded-lg ${theme.name === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-700'} transition-colors`}
                  aria-label="Toggle mobile menu"
                >
                  <svg
                    className={`w-6 h-6 ${theme.text}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isMobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <ul className="py-4 space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={closeMobileMenu}
                      className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                        isActive(item.path)
                          ? `${theme.primary} text-white`
                          : theme.name === 'light'
                          ? 'text-gray-700 hover:bg-gray-100'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMobileMenu}
          />
        )}

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className={`${theme.footerBg} ${theme.footerText} py-8 transition-colors duration-300`}>
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                © {new Date().getFullYear()} Gayathri Polubothu. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 md:mt-0">
                <a
                  href="https://github.com/gayathri-polubothu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/gayathri-polubothu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:gayathri.polubothu@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Email
                </a>
                <a
                  href="/Gayathri_Polubothu_CV.pdf"
                  download
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

