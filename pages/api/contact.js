import dbConnect from '../../lib/dbConnect';
import Contact from '../../models/Contact';
import { sendContactNotification, sendConfirmationEmail } from '../../lib/emailService';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const contacts = await Contact.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: contacts });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const { name, email, message } = req.body;

        // Save to database
        const contact = await Contact.create(req.body);

        // Send email notification to you
        const emailResult = await sendContactNotification({ name, email, message });
        
        if (!emailResult.success) {
          console.warn('Email notification failed:', emailResult.error);
          // Still return success as the contact was saved to database
        }

        // Optionally send confirmation email to the sender
        // await sendConfirmationEmail({ name, email });

        res.status(201).json({ 
          success: true, 
          data: contact,
          emailSent: emailResult.success 
        });
      } catch (error) {
        console.error('Contact API Error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Method not allowed' });
      break;
  }
}

