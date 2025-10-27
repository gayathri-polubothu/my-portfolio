import dbConnect from '../../lib/dbConnect';
import Certification from '../../models/Certification';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const certifications = await Certification.find({}).sort({ order: 1, createdAt: -1 });
        res.status(200).json({ success: true, data: certifications });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const certification = await Certification.create(req.body);
        res.status(201).json({ success: true, data: certification });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Invalid request method' });
      break;
  }
}

