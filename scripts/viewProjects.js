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

async function viewProjects() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB!');

    const projects = await Project.find({}).sort({ order: 1 });
    
    console.log('\n=== CURRENT PROJECTS IN DATABASE ===\n');
    
    projects.forEach((project, index) => {
      console.log(`\n${index + 1}. ${project.title}`);
      console.log(`   Order: ${project.order}`);
      console.log(`   Featured: ${project.featured}`);
      console.log(`   Image: ${project.image}`);
      console.log(`   Description: ${project.description.substring(0, 100)}...`);
      console.log(`   Tech: ${project.tech.join(', ')}`);
      console.log(`   Features: ${project.features?.length || 0} features`);
      console.log(`   Key Responsibilities: ${project.keyResponsibilities?.length || 0} items`);
      if (project.demoUrl) console.log(`   Demo URL: ${project.demoUrl}`);
      if (project.githubUrl) console.log(`   GitHub URL: ${project.githubUrl}`);
    });

    console.log('\n\n=== FULL PROJECT DATA (Copy this to update seed script) ===\n');
    console.log(JSON.stringify(projects, null, 2));

  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\nMongoDB connection closed.');
  }
}

viewProjects();

