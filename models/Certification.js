import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a certification title'],
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    issuer: {
      type: String,
      required: [true, 'Please provide the issuing organization'],
      maxlength: [100, 'Issuer name cannot be more than 100 characters'],
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
      required: [true, 'Please provide an image URL'],
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot be more than 500 characters'],
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

export default mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);

