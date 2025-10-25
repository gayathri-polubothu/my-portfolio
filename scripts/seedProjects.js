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
}, {
  timestamps: true,
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

// Projects data based on resume
const projects = [
  {
    title: 'ZORO UK - E-Commerce Platform',
    description: 'Full-stack e-commerce web application built with React.js, Next.js, Node.js, and Express.js. Implemented microservices with HashiCorp Vault for secrets management and Unleash for feature flagging. Integrated RESTful APIs and GraphQL with comprehensive Jest and Cypress testing.',
    image: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=ZORO+UK',
    tech: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Microservices', 'Jest', 'Cypress'],
    demoUrl: '',
    githubUrl: '',
    featured: true,
    order: 1,
    features: [
      {
        title: 'Proforma payment method on checkout/order page end-end',
        description: [
          'Implemented complete end-to-end Proforma payment method integration',
          'Built user-friendly checkout flow with payment validation',
          'Integrated payment processing with backend APIs',
          'Added comprehensive error handling and success notifications',
          'Implemented order confirmation and receipt generation',
          'Added Jest unit tests and Cypress E2E tests for payment flow'
        ],
        images: [
          'https://via.placeholder.com/600x400/6366f1/ffffff?text=Proforma+Checkout',
          'https://via.placeholder.com/600x400/6366f1/ffffff?text=Proforma+Order+Page'
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
          'https://via.placeholder.com/600x400/6366f1/ffffff?text=Unleash+Extension+Dashboard',
          'https://via.placeholder.com/600x400/6366f1/ffffff?text=Feature+Toggle+Interface'
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
          'https://via.placeholder.com/600x400/6366f1/ffffff?text=Account+Menu+Desktop',
          'https://via.placeholder.com/600x400/6366f1/ffffff?text=Account+Menu+Mobile'
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
          'https://via.placeholder.com/600x400/6366f1/ffffff?text=Order+Confirmation',
          'https://via.placeholder.com/600x400/6366f1/ffffff?text=Order+Details'
        ]
      }
    ]
  },
  {
    title: 'Quintesse Management Platform',
    description: 'Developed enterprise management application with features including CML, analytics reporting, and change log tracking. Built with React.js, Redux, and Node.js. Integrated Sentry for error monitoring and implemented comprehensive Cypress testing.',
    image: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Quintesse',
    tech: ['React.js', 'Redux', 'Node.js', 'JavaScript', 'Cypress', 'Sentry'],
    demoUrl: '',
    githubUrl: '',
    featured: true,
    order: 2,
  },
  {
    title: 'Atlantis 2.0 - IoT Platform',
    description: 'Backend platform built with microservices architecture using Node.js. Developed RESTful APIs for creating, updating, and managing connection templates, connectors, and adapters. Implemented comprehensive Jest testing and managed 50+ sprint deployments.',
    image: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Atlantis+2.0',
    tech: ['Node.js', 'JavaScript', 'Microservices', 'REST API', 'Jest', 'Git'],
    demoUrl: '',
    githubUrl: '',
    featured: true,
    order: 3,
  },
  {
    title: 'TRC/IE - Integration Platform',
    description: 'Full-stack integration platform for connecting source and target systems. Developed various data sources including Flex, REST, SOAP, FTP, and Static connectors. Built using Thingworx IoT platform with JavaScript for API development.',
    image: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=TRC%2FIE',
    tech: ['JavaScript', 'Thingworx', 'REST API', 'SOAP', 'FTP'],
    demoUrl: '',
    githubUrl: '',
    featured: false,
    order: 4,
  },
  {
    title: 'PTC Flex PLM Integration',
    description: 'Enterprise PLM integration system connecting Flex PLM source system with NexGen target system. Developed APIs and user interfaces using Thingworx Mashups for seamless data exchange and system integration.',
    image: 'https://via.placeholder.com/400x300/ef4444/ffffff?text=Flex+PLM',
    tech: ['Thingworx', 'JavaScript', 'REST API', 'Integration'],
    demoUrl: '',
    githubUrl: '',
    featured: false,
    order: 5,
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

