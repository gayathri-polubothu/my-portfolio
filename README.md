# My Portfolio

A modern, full-stack portfolio website built with Next.js, MongoDB, GraphQL, and Tailwind CSS.

## 🌐 Live Demo

**Visit my portfolio:** [https://gayathri-polubothu-portfolio.vercel.app](https://gayathri-polubothu-portfolio.vercel.app)

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://gayathri-polubothu-portfolio.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 🚀 Features

- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **GraphQL API**: Apollo Server with full CRUD operations
- **MongoDB Integration**: Store projects and contact messages
- **Image Uploads**: Cloudinary integration for optimized images
- **Contact Form**: Functional contact form with email validation
- **Project Showcase**: Dynamic projects page with filtering
- **SEO Optimized**: Meta tags and semantic HTML

## 📋 Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, Apollo Server
- **Database**: MongoDB Atlas (free tier)
- **Image Storage**: Cloudinary (free tier)
- **Deployment**: Vercel (recommended, free)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database)
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string

### 3. Set Up Cloudinary (Free)

1. Go to [Cloudinary](https://cloudinary.com/users/register/free)
2. Create a free account
3. Go to Dashboard to get your credentials

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with your credentials:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/portfolio
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## 📁 Project Structure

```
my-portfolio/
├── components/
│   ├── ImageUpload.js    # Cloudinary image upload component
│   └── Layout.js         # Main layout with nav and footer
├── lib/
│   ├── apollo-client.js  # Apollo Client configuration
│   ├── cloudinary.js     # Cloudinary helper functions
│   └── dbConnect.js      # MongoDB connection
├── models/
│   ├── Contact.js        # Contact form schema
│   └── Project.js        # Project schema
├── pages/
│   ├── api/
│   │   ├── contact.js    # Contact API endpoint
│   │   ├── graphql.js    # GraphQL server
│   │   ├── projects.js   # Projects REST API
│   │   └── upload.js     # Image upload endpoint
│   ├── contact.js        # Contact page
│   ├── index.js          # Home page
│   └── projects.js       # Projects page
└── styles/
    └── globals.css       # Tailwind styles
```

## 🎨 Customization

### Update Personal Information

1. **Home Page** (`pages/index.js`):
   - Line 30: Update "Your Name"
   - Line 33: Update your role/skills
   - Line 35-37: Update your bio

2. **Layout** (`components/Layout.js`):
   - Lines 64-86: Update social media links

3. **Contact Page** (`pages/contact.js`):
   - Line 150: Update email address
   - Lines 155-171: Update social links

### Add Your Projects

You can add projects via GraphQL API or directly to MongoDB:

#### Option 1: Using GraphQL Playground

1. Go to `http://localhost:3000/api/graphql`
2. Run this mutation:

```graphql
mutation {
  createProject(
    title: "My Awesome Project"
    description: "A full-stack application built with React and Node.js"
    image: "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    tech: ["React", "Node.js", "MongoDB"]
    demoUrl: "https://demo.com"
    githubUrl: "https://github.com/username/repo"
    featured: true
    order: 1
  ) {
    id
    title
  }
}
```

#### Option 2: Using REST API

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "Project description",
    "image": "https://image-url.com/image.jpg",
    "tech": ["React", "Next.js"],
    "demoUrl": "https://demo.com",
    "githubUrl": "https://github.com/username/repo",
    "featured": true
  }'
```

## 🚢 Deployment

### Deploy to Vercel (Recommended - Free)

**Live Demo:** [https://gayathri-polubothu-portfolio.vercel.app](https://gayathri-polubothu-portfolio.vercel.app)

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com)

3. Click "Import Project" and select your repository

4. Add environment variables in Vercel dashboard:
   - Go to Project → Settings → Environment Variables
   - Add all variables from `.env.local`

5. Deploy! Vercel will automatically build and host your site

### Environment Variables on Vercel

Add these **exact** variable names in Vercel dashboard (Production, Preview, and Development):

- `MONGODB_URI` - Your MongoDB Atlas connection string
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name (⚠️ Note: NEXT_PUBLIC_ prefix is required!)
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `EMAIL_USER` - Gmail address for contact form
- `EMAIL_PASS` - Gmail app password (get from https://myaccount.google.com/apppasswords)
- `EMAIL_TO` - Email address to receive contact form submissions

**Important:** After adding environment variables, redeploy your site for changes to take effect.

## 📸 Adding Screenshots

To upload project images:

1. Use the `ImageUpload` component in your admin panel (create one)
2. Or directly use Cloudinary dashboard to upload
3. Copy the image URL and use it in project creation

## 🔒 Security Notes

- Never commit `.env.local` to Git (already in `.gitignore`)
- Keep your Cloudinary API secret private
- Consider adding authentication for admin routes in production

## 📚 API Documentation

### REST Endpoints

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a project
- `GET /api/contact` - Get all contacts
- `POST /api/contact` - Submit contact form

### GraphQL Endpoint

- `/api/graphql` - GraphQL playground and API

**Queries:**
- `projects` - Get all projects
- `featuredProjects` - Get featured projects only
- `project(id: ID!)` - Get single project

**Mutations:**
- `createProject` - Create new project
- `updateProject` - Update existing project
- `deleteProject` - Delete project
- `createContact` - Submit contact form

## 🐛 Troubleshooting

### MongoDB Connection Error

- Check your connection string format
- Ensure IP address is whitelisted in MongoDB Atlas
- Verify credentials are correct

### Cloudinary Upload Error

- Check API credentials
- Ensure file size is under 10MB
- Verify file is a valid image format

### GraphQL Errors

- Check MongoDB connection
- Verify data structure matches schema
- Check browser console for detailed errors

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize!

---

Built with ❤️ using Next.js, MongoDB, and GraphQL

