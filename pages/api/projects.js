import dbConnect from '../../lib/dbConnect';
import Project from '../../models/Project';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
        res.status(200).json({ success: true, data: projects });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, data: project });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Method not allowed' });
      break;
  }
}

