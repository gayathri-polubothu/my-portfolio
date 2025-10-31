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
  database: ['MongoDB', 'MySQL', 'AWS', 'Azure', 'Docker'],
  IOT: ['Thingworx'],
  eventdriven: ['AWS SQS', 'AWS SNS', 'Redis', 'Kafka']
};

// Social Media Links
export const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    url: PERSONAL_INFO.linkedin,
    icon: 'linkedin',
    bgColor: {
      light: 'bg-blue-600 hover:bg-blue-700',
      dark: 'bg-blue-600 hover:bg-blue-700'
    },
    textColor: 'text-white'
  },
  {
    name: 'GitHub',
    url: PERSONAL_INFO.github,
    icon: 'github',
    bgColor: {
      light: 'bg-gray-900 hover:bg-gray-800',
      dark: 'bg-gray-700 hover:bg-gray-600'
    },
    textColor: 'text-white'
  },
  {
    name: 'ZORO UK',
    url: PERSONAL_INFO.company.url,
    icon: 'briefcase',
    bgColor: {
      light: 'bg-orange-300 hover:bg-orange-400',
      dark: 'bg-orange-300 hover:bg-orange-400'
    },
    textColor: 'text-gray-900'
  }
];

