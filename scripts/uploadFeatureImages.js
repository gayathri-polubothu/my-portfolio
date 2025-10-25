const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a single image to Cloudinary
 * @param {string} imagePath - Path to the image file
 * @param {string} folder - Cloudinary folder name
 * @returns {Promise<string>} - Cloudinary URL
 */
async function uploadImage(imagePath, folder = 'portfolio/zoro') {
  try {
    console.log(`Uploading ${imagePath}...`);
    
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: folder,
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    });

    console.log(`✅ Uploaded successfully: ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Error uploading ${imagePath}:`, error.message);
    throw error;
  }
}

/**
 * Upload multiple images from a directory
 * @param {string} dirPath - Directory containing images
 * @param {string} folder - Cloudinary folder name
 * @returns {Promise<Object>} - Object with filename as key and URL as value
 */
async function uploadImagesFromDirectory(dirPath, folder = 'portfolio/zoro') {
  const results = {};
  
  try {
    const files = fs.readdirSync(dirPath);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    if (imageFiles.length === 0) {
      console.log('No image files found in the directory.');
      return results;
    }

    console.log(`Found ${imageFiles.length} image(s) to upload.\n`);

    for (const file of imageFiles) {
      const filePath = path.join(dirPath, file);
      try {
        const url = await uploadImage(filePath, folder);
        results[file] = url;
      } catch (error) {
        console.error(`Failed to upload ${file}`);
        results[file] = null;
      }
    }

    return results;
  } catch (error) {
    console.error('Error reading directory:', error.message);
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('=== ZORO Feature Images Uploader ===\n');

  // Check if Cloudinary is configured
  if (!process.env.CLOUDINARY_CLOUD_NAME || 
      !process.env.CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ Cloudinary credentials not found in .env.local');
    console.error('Please add the following to your .env.local file:');
    console.error('  CLOUDINARY_CLOUD_NAME=your_cloud_name');
    console.error('  CLOUDINARY_API_KEY=your_api_key');
    console.error('  CLOUDINARY_API_SECRET=your_api_secret');
    process.exit(1);
  }

  // Get command line arguments
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage:');
    console.log('  1. Upload single image:');
    console.log('     node scripts/uploadFeatureImages.js path/to/image.png');
    console.log('');
    console.log('  2. Upload all images from a directory:');
    console.log('     node scripts/uploadFeatureImages.js path/to/directory/');
    console.log('');
    console.log('Examples:');
    console.log('  node scripts/uploadFeatureImages.js public/projects/zoro/proforma-checkout.png');
    console.log('  node scripts/uploadFeatureImages.js public/projects/zoro/');
    console.log('');
    return;
  }

  const inputPath = args[0];

  // Check if path exists
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Path does not exist: ${inputPath}`);
    process.exit(1);
  }

  const stats = fs.statSync(inputPath);

  if (stats.isDirectory()) {
    // Upload all images from directory
    console.log(`Uploading all images from: ${inputPath}\n`);
    const results = await uploadImagesFromDirectory(inputPath);
    
    console.log('\n=== Upload Summary ===');
    console.log('Copy these URLs to your seed script:\n');
    
    Object.entries(results).forEach(([filename, url]) => {
      if (url) {
        console.log(`${filename}:`);
        console.log(`  '${url}',`);
      }
    });
  } else if (stats.isFile()) {
    // Upload single image
    const url = await uploadImage(inputPath);
    console.log('\n=== Upload Complete ===');
    console.log('Copy this URL to your seed script:');
    console.log(`'${url}'`);
  } else {
    console.error('❌ Invalid path type');
    process.exit(1);
  }

  console.log('\n✅ All uploads completed!');
  console.log('\nNext steps:');
  console.log('1. Copy the URLs above');
  console.log('2. Update scripts/seedProjects.js with the new URLs');
  console.log('3. Run: node scripts/seedProjects.js');
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

