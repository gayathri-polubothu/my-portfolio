const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Certification Schema (same as in models/Certification.js)
const CertificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    issuer: {
      type: String,
      required: true,
      maxlength: 100,
    },
    issueDate: {
      type: String,
      default: '',
    },
    credentialId: {
      type: String,
      default: '',
    },
    credentialUrl: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 500,
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Certification = mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);

// Exact certification data extracted from certificate images
const certificationData = [
  {
    title: 'CSP104 - Secure Software Coding',
    issuer: 'Security Compass',
    issueDate: 'August 12, 2025',
    description: 'Training course on secure software coding practices and implementation',
    skills: ['Secure Coding', 'Software Security'],
    order: 1,
  },
  {
    title: 'PCI102 - PCI Secure Software Lifecycle',
    issuer: 'Security Compass',
    issueDate: 'August 14, 2025',
    description: 'Training course on PCI compliance and secure software lifecycle management',
    skills: ['PCI Compliance', 'Secure Software Lifecycle', 'Software Security'],
    order: 2,
  },
  {
    title: 'NOD101 - Defending Node.js',
    issuer: 'Security Compass',
    issueDate: 'August 14, 2025',
    description: 'Training course on securing Node.js applications and defending against vulnerabilities',
    skills: ['Node.js Security', 'Secure Coding', 'Node.js'],
    order: 3,
  },
  {
    title: 'Programming Foundations: Secure Coding',
    issuer: 'LinkedIn Learning',
    issueDate: 'September 7, 2023',
    credentialId: 'cc02c119557313e0dc375e8a166399b40411e21773061374a5b19914a8fcb9',
    description: 'Course completed on September 7, 2023 covering secure coding fundamentals and best practices',
    skills: ['Secure Coding', 'Programming Foundations'],
    order: 4,
  },
  {
    title: 'Anti-Bribery: Making the Right Decisions',
    issuer: 'Grainger',
    issueDate: 'August 6, 2023',
    description: 'Corporate compliance training on anti-bribery policies and ethical decision making',
    skills: ['Compliance', 'Ethics', 'Anti-Bribery'],
    order: 5,
  },
  {
    title: 'Global Trade Compliance',
    issuer: 'Grainger',
    issueDate: 'August 6, 2023',
    description: 'Corporate compliance training on global trade regulations and international trade compliance',
    skills: ['Compliance', 'Global Trade', 'International Trade'],
    order: 6,
  },
  {
    title: 'PDPGC: Social Engineering: Give You My Password? (791social)',
    issuer: 'Grainger',
    issueDate: 'August 6, 2023',
    description: 'Security awareness training on social engineering threats and password security',
    skills: ['Security Awareness', 'Social Engineering', 'Cybersecurity'],
    order: 7,
  },
];

async function uploadCertifications() {
  try {
    console.log('🚀 Starting certification upload process...\n');

    // Connect to MongoDB
    console.log('📦 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing certifications
    console.log('🗑️  Clearing existing certifications...');
    await Certification.deleteMany({});
    console.log('✅ Cleared existing data\n');

    // Get all certification images
    const certsDir = path.join(__dirname, '../public/course_certifications');
    const imageFiles = fs.readdirSync(certsDir).filter(file => 
      file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
    );

    console.log(`📸 Found ${imageFiles.length} certification images\n`);

    // Upload images to Cloudinary and save to MongoDB
    for (let i = 0; i < imageFiles.length; i++) {
      const imageFile = imageFiles[i];
      const certData = certificationData[i] || {
        title: `Certification ${i + 1}`,
        issuer: 'Professional Institute',
        issueDate: '2024',
        description: 'Professional certification course completion',
        skills: ['Professional Development'],
        order: i + 1,
      };

      console.log(`📤 Uploading ${i + 1}/${imageFiles.length}: ${imageFile}`);

      try {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(
          path.join(certsDir, imageFile),
          {
            folder: 'portfolio/certifications',
            public_id: `cert_${i + 1}`,
            overwrite: true,
            transformation: [
              { width: 1200, height: 800, crop: 'limit' },
              { quality: 'auto', fetch_format: 'auto' }
            ]
          }
        );

        console.log(`   ✅ Uploaded to Cloudinary: ${result.public_id}`);

        // Save to MongoDB
        const certification = await Certification.create({
          ...certData,
          image: result.secure_url,
        });

        console.log(`   ✅ Saved to MongoDB: ${certification.title}`);
        console.log(`   🔗 Image URL: ${result.secure_url}\n`);

      } catch (error) {
        console.error(`   ❌ Error uploading ${imageFile}:`, error.message);
      }
    }

    // Fetch and display all certifications
    console.log('\n📋 All Certifications in MongoDB:\n');
    console.log('='.repeat(80));
    const allCertifications = await Certification.find({}).sort({ order: 1 });
    
    allCertifications.forEach((cert, index) => {
      console.log(`\n${index + 1}. ${cert.title}`);
      console.log(`   Issuer: ${cert.issuer}`);
      console.log(`   Issue Date: ${cert.issueDate}`);
      console.log(`   Skills: ${cert.skills.join(', ')}`);
      console.log(`   Image URL: ${cert.image}`);
      console.log(`   MongoDB ID: ${cert._id}`);
    });

    console.log('\n' + '='.repeat(80));
    console.log(`\n✅ Successfully uploaded ${allCertifications.length} certifications!`);
    console.log('\n🎉 All certifications are ready to display on your portfolio!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  }
}

// Run the upload
uploadCertifications();

