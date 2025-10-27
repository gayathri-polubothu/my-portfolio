const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadProfileImage() {
  try {
    console.log('Uploading profile image to Cloudinary...\n');

    // Upload profile image
    const result = await cloudinary.uploader.upload(
      path.join(__dirname, '../public/MyImage/profile.png'),
      {
        folder: 'portfolio',
        public_id: 'profile',
        overwrite: true,
        transformation: [
          { width: 400, height: 400, crop: 'fill', gravity: 'face' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      }
    );

    console.log('✅ Profile image uploaded successfully!\n');
    console.log('Image URL:', result.secure_url);
    console.log('Public ID:', result.public_id);
    console.log('\nOptimized transformations available:');
    console.log('- Small (200x200):', result.secure_url.replace('/upload/', '/upload/w_200,h_200,c_fill,g_face/'));
    console.log('- Medium (400x400):', result.secure_url.replace('/upload/', '/upload/w_400,h_400,c_fill,g_face/'));
    console.log('- Large (800x800):', result.secure_url.replace('/upload/', '/upload/w_800,h_800,c_fill,g_face/'));
    
    console.log('\n📋 Copy this URL to use in your code:');
    console.log(result.secure_url);
    
    return result;
  } catch (error) {
    console.error('❌ Error uploading image:', error.message);
    process.exit(1);
  }
}

// Run the upload
uploadProfileImage();

