import { uploadImage } from '../../lib/cloudinary';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Set desired value here
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { file, folder } = req.body;

    if (!file) {
      return res.status(400).json({ success: false, message: 'No file provided' });
    }

    const result = await uploadImage(file, folder);
    
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

