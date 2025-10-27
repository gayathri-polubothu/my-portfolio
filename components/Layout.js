import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

export default function Layout({ children, title = 'My Portfolio' }) {
  const router = useRouter();
  const { theme } = useTheme();

  const navItems = [
    { name: 'About', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => router.pathname === path;

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
              <Link href="/" className={`text-xl font-bold ${theme.primaryText} transition-colors`}>
                Gayathri Polubothu
              </Link>

              <div className="flex items-center space-x-6">
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
            </div>
          </div>
        </nav>

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

