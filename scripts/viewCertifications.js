const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Certification Schema
const CertificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: String, default: '' },
    credentialId: { type: String, default: '' },
    credentialUrl: { type: String, default: '' },
    image: { type: String, required: true },
    description: { type: String, default: '' },
    skills: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Certification = mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);

async function viewCertifications() {
  try {
    console.log('🔍 Connecting to MongoDB...\n');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    const certifications = await Certification.find({}).sort({ order: 1 });
    
    console.log('📚 CERTIFICATIONS COLLECTION DATA');
    console.log('='.repeat(100));
    console.log(`\nTotal Certifications: ${certifications.length}\n`);
    
    certifications.forEach((cert, index) => {
      console.log(`\n${'-'.repeat(100)}`);
      console.log(`\n📜 CERTIFICATION #${index + 1}`);
      console.log(`\nMongoDB ID: ${cert._id}`);
      console.log(`Title: ${cert.title}`);
      console.log(`Issuer: ${cert.issuer}`);
      console.log(`Issue Date: ${cert.issueDate}`);
      console.log(`Description: ${cert.description}`);
      console.log(`Skills: ${cert.skills.join(', ')}`);
      console.log(`Order: ${cert.order}`);
      console.log(`\nCloudinary Image URL: ${cert.image}`);
      console.log(`\nCreated At: ${cert.createdAt}`);
      console.log(`Updated At: ${cert.updatedAt}`);
      if (cert.credentialId) console.log(`Credential ID: ${cert.credentialId}`);
      if (cert.credentialUrl) console.log(`Credential URL: ${cert.credentialUrl}`);
    });
    
    console.log(`\n${'='.repeat(100)}\n`);
    
    // Summary stats
    const allSkills = [...new Set(certifications.flatMap(c => c.skills))];
    const allIssuers = [...new Set(certifications.map(c => c.issuer))];
    
    console.log('📊 SUMMARY STATISTICS\n');
    console.log(`Total Certifications: ${certifications.length}`);
    console.log(`Total Unique Skills: ${allSkills.length}`);
    console.log(`Total Unique Issuers: ${allIssuers.length}`);
    console.log(`\nAll Skills: ${allSkills.sort().join(', ')}`);
    console.log(`\nAll Issuers: ${allIssuers.join(', ')}`);
    
    console.log(`\n${'='.repeat(100)}\n`);
    console.log('✅ Data retrieval complete!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB\n');
  }
}

viewCertifications();

