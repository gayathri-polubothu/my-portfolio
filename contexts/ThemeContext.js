import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  light: {
    name: 'light',
    background: 'bg-gray-50',
    cardBg: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    textTertiary: 'text-gray-400',
    border: 'border-gray-200',
    navBg: 'bg-white',
    shadow: 'shadow-sm',
    primary: 'bg-primary-600',
    primaryText: 'text-primary-600',
    primaryHover: 'hover:bg-primary-700',
    buttonSecondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    gradient: 'from-primary-50 to-primary-100',
    footerBg: 'bg-gray-900',
    footerText: 'text-white',
    techBadgeBg: 'bg-primary-50 border border-primary-200',
    techBadgeText: 'text-primary-700',
  },
  dark: {
    name: 'dark',
    background: 'bg-gray-900',
    cardBg: 'bg-gray-800',
    text: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textTertiary: 'text-gray-500',
    border: 'border-gray-700',
    navBg: 'bg-gray-800',
    shadow: 'shadow-lg shadow-black/20',
    primary: 'bg-primary-500',
    primaryText: 'text-primary-400',
    primaryHover: 'hover:bg-primary-600',
    buttonSecondary: 'bg-gray-700 text-gray-100 hover:bg-gray-600',
    gradient: 'from-gray-800 to-gray-900',
    footerBg: 'bg-black',
    footerText: 'text-gray-100',
    techBadgeBg: 'bg-primary-500/10 border border-primary-500/30',
    techBadgeText: 'text-primary-400',
  },
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    } else {
      // Set default theme to dark if no saved preference
      setCurrentTheme('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

