import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a project title'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a project description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    tech: {
      type: [String],
      required: [true, 'Please provide technologies used'],
    },
    demoUrl: {
      type: String,
      default: '',
    },
    githubUrl: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    features: {
      type: [{
        title: {
          type: String,
          required: true,
        },
        description: {
          type: [String],
          default: [],
        },
        images: {
          type: [String],
          default: [],
        },
      }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);

