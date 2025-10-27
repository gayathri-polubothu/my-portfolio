const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tech: [{ type: String, required: true }],
  demoUrl: String,
  githubUrl: String,
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  features: [{
    title: { type: String, required: true },
    description: [{ type: String }],
    images: [{ type: String }],
  }],
  keyResponsibilities: [{ type: String }],
}, {
  timestamps: true,
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

// Projects data based on resume
const projects = [
  {
    title: 'ZORO UK - E-Commerce Platform',
    description: 'Full-stack e-commerce web application built with React.js, Next.js, Node.js, and Express.js. Implemented microservices with HashiCorp Vault for secrets management and Unleash for feature flagging. Integrated RESTful APIs and GraphQL with comprehensive Jest and Cypress testing.',
    image: 'https://res.cloudinary.com/db9baiycp/image/upload/v1761338929/Screenshot_2025-10-24_at_21.48.40_xabh9j.png',
    tech: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Microservices', 'Jest', 'Cypress'],
    demoUrl: '',
    githubUrl: '',
    featured: true,
    order: 1,
    features: [
      {
        title: 'Proforma payment method For Business customers',
        description: [
          'Implemented complete end-to-end Proforma payment method integration for credit and standard business accounts',
          'Built user-friendly checkout flow with payment validation',
          'Integrated payment processing with backend APIs',
          'Added comprehensive error handling and success notifications',
          'Implemented order confirmation and proforma invoice generation',
          'Added Jest unit tests and Cypress E2E tests for payment flow'
        ],
        images: [
          'https://res.cloudinary.com/db9baiycp/image/upload/v1761424193/Screenshot_2025-09-16_at_17.10.26_ghqvro.png',
          'https://res.cloudinary.com/db9baiycp/image/upload/v1761428363/Screenshot_2025-09-16_at_17.10.55_tv1xjg.png',
          'https://res.cloudinary.com/db9baiycp/image/upload/v1761428364/Screenshot_2025-09-16_at_17.14.48_sentaw.png',
          'https://res.cloudinary.com/db9baiycp/image/upload/v1761428364/Screenshot_2025-09-16_at_17.11.28_hd87fd.png',
          'https://res.cloudinary.com/db9baiycp/image/upload/v1761428364/Screenshot_2025-09-16_at_17.11.53_l91nv6.png'
        ]
      },
      {
        title: 'ZORO Unleash internal extension to developers and CS team',
        description: [
          'Developed internal Chrome extension for feature flag management',
          'Integrated with Unleash feature flagging system',
          'Provided developers and CS team ability to toggle features',
          'Built intuitive UI for feature flag visualization',
          'Implemented real-time feature flag updates',
          'Added user authentication and role-based access control'
        ],
        images: [
          'https://res.cloudinary.com/db9baiycp/image/upload/v1761428572/Screenshot_2025-10-25_at_22.42.07_iuych8.png',
          'https://res.cloudinary.com/db9baiycp/image/upload/v1761428572/Screenshot_2025-10-25_at_22.41.48_notfkp.png'
        ]
      },
      {
        title: 'My account menu revamp with the given figma design',
        description: [
          'Redesigned account menu based on Figma specifications',
          'Implemented modern, responsive UI with Tailwind CSS',
          'Enhanced user experience with smooth animations',
          'Added intuitive navigation structure',
          'Improved accessibility with ARIA labels',
          'Implemented mobile-first responsive design'
        ],
        images: [
          'https://res.cloudinary.com/db9baiycp/image/upload/v1761430023/Screenshot_2025-10-25_at_23.06.20_z8xxli.png',
          'https://res.cloudinary.com/db9baiycp/image/upload/v1761430024/Screenshot_2025-10-25_at_23.06.39_l266s8.png'
        ]
      },
      {
        title: 'Order/confirmation page revamp with the given figma design',
        description: [
          'Redesigned order confirmation page following Figma design',
          'Implemented clean, modern order summary layout',
          'Added order tracking visualization',
          'Integrated print and email receipt functionality',
          'Enhanced mobile responsiveness',
          'Improved page load performance with optimized rendering'
        ],
        images: [
          'https://res.cloudinary.com/db9baiycp/image/upload/v1761428363/Screenshot_2025-09-16_at_17.10.55_tv1xjg.png',
          'https://res.cloudinary.com/db9baiycp/image/upload/v1761576928/Screenshot_2025-10-27_at_14.55.13_clxmzv.png'
        ]
      }
    ]
  },
  {
    title: 'Quintesse Management Platform',
    description: 'Developed enterprise management application with features including CML, analytics reporting, and change log tracking. Built with React.js, Redux, and Node.js. Integrated Sentry for error monitoring and implemented comprehensive Cypress testing.',
    image: 'https://res.cloudinary.com/db9baiycp/image/upload/v1761391873/Quintesse_Home_Page_wfxvyb.png',
    tech: ['React.js', 'Redux', 'Node.js', 'JavaScript', 'Cypress', 'Sentry'],
    demoUrl: '',
    githubUrl: '',
    featured: true,
    order: 2,
    keyResponsibilities: [
      'Developed enterprise management application with CML (Configuration Management List) features',
      'Implemented comprehensive analytics reporting dashboard with real-time data visualization',
      'Built change log tracking system for audit trail and version control',
      'Integrated Sentry for error monitoring and performance tracking',
      'Implemented state management using Redux for complex application state',
      'Developed RESTful APIs with Node.js for backend services',
      'Created comprehensive Cypress E2E test suites for critical user workflows',
      'Optimized application performance and reduced load times',
      'Collaborated with cross-functional teams for requirements gathering and implementation'
    ]
  },
  {
    title: 'Atlantis 2.0 - IoT Platform',
    description: 'Backend platform built with microservices architecture using Node.js. Developed RESTful APIs for creating, updating, and managing connection templates, connectors, and adapters. Implemented comprehensive Jest testing and managed 50+ sprint deployments.',
    image: 'https://res.cloudinary.com/db9baiycp/image/upload/v1761577893/Atlantis2.0_npedin.webp',
    tech: ['Node.js', 'JavaScript', 'Microservices', 'REST API', 'Jest', 'Git'],
    demoUrl: '',
    githubUrl: '',
    featured: true,
    order: 3,
    keyResponsibilities: [
      'Architected and developed backend platform using microservices architecture with Node.js',
      'Created RESTful APIs for connection template management and configuration',
      'Developed connector and adapter systems for IoT device integration',
      'Implemented CRUD operations for managing connection templates across multiple protocols',
      'Built comprehensive Jest unit and integration tests achieving 80%+ code coverage',
      'Managed and deployed 50+ sprint releases with zero downtime',
      'Designed scalable API architecture to handle high-volume IoT data streams',
      'Implemented error handling and logging mechanisms for debugging and monitoring',
      'Collaborated with frontend teams to define API contracts and data models',
      'Optimized database queries and API performance for improved response times'
    ]
  },
  {
    title: 'TRC/IE - Integration Platform',
    description: 'Full-stack integration platform for connecting source and target systems. Developed various data sources including Flex, REST, SOAP, FTP, and Static connectors. Built using Thingworx IoT platform with JavaScript for API development.',
    image: 'https://res.cloudinary.com/db9baiycp/image/upload/v1761430870/Screenshot_2025-10-25_at_23.16.53_nxhuty.png',
    tech: ['JavaScript', 'Thingworx', 'REST API', 'SOAP', 'FTP'],
    demoUrl: '',
    githubUrl: '',
    featured: false,
    order: 4,
    keyResponsibilities: [
      'Developed full-stack integration platform connecting multiple source and target systems',
      'Implemented Flex connector for PTC Flex PLM system integration',
      'Built REST and SOAP API connectors for seamless data exchange',
      'Created FTP connector for file-based data transfer and synchronization',
      'Developed static data connectors for configuration and reference data',
      'Utilized Thingworx IoT platform for API development and mashup creation',
      'Designed data transformation logic for cross-system compatibility',
      'Implemented error handling and retry mechanisms for reliable data transfer',
      'Created comprehensive logging and monitoring for integration workflows',
      'Collaborated with stakeholders to understand integration requirements and deliver solutions'
    ]
  },
  {
    title: 'PTC Flex PLM Integration',
    description: 'Enterprise PLM integration system connecting Flex PLM source system with NexGen target system. Developed APIs and user interfaces using Thingworx Mashups for seamless data exchange and system integration.',
    image: 'https://res.cloudinary.com/db9baiycp/image/upload/v1761430870/Screenshot_2025-10-25_at_23.18.00_n51siz.png',
    tech: ['Thingworx', 'JavaScript', 'REST API', 'Integration'],
    demoUrl: '',
    githubUrl: '',
    featured: false,
    order: 5,
    keyResponsibilities: [
      'Developed enterprise PLM integration connecting Flex PLM with NexGen target system',
      'Created RESTful APIs for seamless data exchange between systems',
      'Built user interfaces using Thingworx Mashups for intuitive system management',
      'Implemented data synchronization mechanisms for real-time updates',
      'Designed data mapping and transformation logic for cross-system compatibility',
      'Developed error handling and validation for data integrity',
      'Created comprehensive logging and monitoring for integration workflows',
      'Collaborated with PLM stakeholders to gather requirements and deliver solutions',
      'Optimized API performance for handling large product data volumes',
      'Provided technical documentation and support for system users'
    ]
  },
  {
    title: 'Smart Spaces',
    description: 'IoT-enabled smart building management interface built with Angular.js, jQuery, HTML5, and CSS3. Implemented custom directives, AJAX calls for real-time communication, and Cordova plugins for cross-platform mobile deployment.',
    image: 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=Smart+Spaces',
    tech: ['Angular.js', 'jQuery', 'HTML5', 'CSS3', 'AJAX', 'Cordova', 'Gulp'],
    demoUrl: '',
    githubUrl: '',
    featured: false,
    order: 6,
    keyResponsibilities: [
      'Developed IoT-enabled smart building management interface using Angular.js',
      'Created custom Angular directives for reusable UI components',
      'Implemented real-time communication using AJAX calls for live data updates',
      'Integrated IoT sensors and devices for building automation and monitoring',
      'Built responsive user interface with HTML5 and CSS3 for cross-device compatibility',
      'Utilized Cordova plugins for cross-platform mobile deployment (iOS and Android)',
      'Implemented jQuery for DOM manipulation and enhanced user interactions',
      'Created build automation scripts using Gulp for optimization and deployment',
      'Developed dashboard visualizations for monitoring building systems and energy usage',
      'Conducted testing and debugging across multiple devices and platforms'
    ]
  },
  {
    title: 'JetStream - Mobile App',
    description: 'Cross-platform mobile application developed with Angular.js, Ionic framework, HTML5, and CSS3. Implemented reusable components, integrated backend services, and handled device-specific optimizations for Android and iOS.',
    image: 'https://via.placeholder.com/400x300/06b6d4/ffffff?text=JetStream',
    tech: ['Angular.js', 'Ionic', 'HTML5', 'CSS3', 'Grunt', 'Cordova'],
    demoUrl: '',
    githubUrl: '',
    featured: false,
    order: 7,
    keyResponsibilities: [
      'Developed cross-platform mobile application using Angular.js and Ionic framework',
      'Created reusable UI components for consistent user experience across platforms',
      'Integrated backend RESTful services for real-time data synchronization',
      'Implemented device-specific optimizations for Android and iOS platforms',
      'Utilized Cordova plugins for accessing native device features (camera, GPS, etc.)',
      'Designed responsive layouts with HTML5 and CSS3 for various screen sizes',
      'Implemented offline-first architecture with local data caching',
      'Built Grunt automation scripts for build optimization and deployment',
      'Conducted performance optimization to reduce app load time and improve responsiveness',
      'Performed testing on multiple devices to ensure compatibility and functionality'
    ]
  },
];

async function seedProjects() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB!');

    // Clear existing projects
    console.log('Clearing existing projects...');
    await Project.deleteMany({});
    console.log('Existing projects cleared!');

    // Insert projects
    console.log('Inserting projects...');
    const result = await Project.insertMany(projects);
    console.log(`Successfully inserted ${result.length} projects!`);

    // Display inserted projects
    console.log('\nInserted Projects:');
    result.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title} (Featured: ${project.featured})`);
    });

    console.log('\n✅ Project seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
    process.exit(1);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
}

// Run the seed function
seedProjects();

