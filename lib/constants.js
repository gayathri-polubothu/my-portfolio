// Personal Information
export const PERSONAL_INFO = {
  name: 'Gayathri Polubothu',
  title: 'Full Stack Developer',
  email: 'gayathri.polubothu@gmail.com',
  location: 'London, United Kingdom',
  github: 'https://github.com/gayathri-polubothu',
  linkedin: 'https://www.linkedin.com/in/gayathri-polubothu/',
  profileImage: 'https://res.cloudinary.com/db9baiycp/image/upload/v1761338342/IMG_1314_c9zf2z.jpg',
  resumePDF: '/Gayathri_Polubothu_CV.pdf',
  company: {
    name: 'ZORO UK',
    url: 'https://www.zoro.co.uk/'
  }
};

// Skills Data
export const SKILLS = {
  frontend: ['React.js', 'Next.js', 'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind'],
  backend: ['Node.js', 'Express', 'GraphQL', 'REST APIs', 'Microservices'],
  database: ['MongoDB', 'MySQL', 'AWS', 'Azure', 'Docker']
};

// Social Media Links
export const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    url: PERSONAL_INFO.linkedin,
    icon: 'linkedin',
    color: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    name: 'GitHub',
    url: PERSONAL_INFO.github,
    icon: 'github',
    color: 'bg-gray-900 hover:bg-gray-800'
  },
  {
    name: 'ZORO UK',
    url: PERSONAL_INFO.company.url,
    icon: 'briefcase',
    color: 'bg-red-600 hover:bg-red-700'
  }
];

