# 🚀 Quick Setup Guide

Your portfolio is **95% complete**! Here's what you need to do to get it running:

## ✅ Already Done

- ✓ Next.js project created
- ✓ All dependencies installed
- ✓ Tailwind CSS configured
- ✓ MongoDB connection setup
- ✓ Cloudinary integration ready
- ✓ GraphQL API created
- ✓ All pages built (Home, Projects, Contact)
- ✓ Beautiful UI with modern design
- ✓ Image upload component ready

## 🔧 Next Steps (5 minutes)

### Step 1: Set Up MongoDB Atlas (FREE)

1. Go to **https://www.mongodb.com/atlas/database**
2. Click "Try Free" and create an account
3. Create a **FREE cluster** (M0 Sandbox - 512MB)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://...`)

### Step 2: Set Up Cloudinary (FREE)

1. Go to **https://cloudinary.com/users/register/free**
2. Create a free account (25GB free storage)
3. Go to Dashboard
4. Copy these three values:
   - Cloud Name
   - API Key
   - API Secret

### Step 3: Update Environment Variables

Edit the `.env.local` file in your project root with your actual credentials:

```bash
# Replace with YOUR MongoDB connection string
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority

# Replace with YOUR Cloudinary credentials
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

### Step 4: Run the Development Server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser!

### Step 5: Customize Your Portfolio

#### Update Personal Information

**File: `pages/index.js`**
```javascript
// Line 30: Change "Your Name"
<span className="text-primary-600">Your Actual Name</span>

// Line 33: Update your skills
Full Stack Developer | React | Next.js | Node.js | MongoDB

// Lines 35-37: Update your bio
```

**File: `components/Layout.js`**
```javascript
// Lines 64-86: Update social media links
<a href="https://github.com/your-username">GitHub</a>
<a href="https://linkedin.com/in/your-profile">LinkedIn</a>
```

**File: `pages/contact.js`**
```javascript
// Line 150: Update email
<a href="mailto:your.email@example.com">📧 Email</a>
```

### Step 6: Add Your First Project

Once the server is running, go to **http://localhost:3000/api/graphql**

Run this mutation (replace with your actual project):

```graphql
mutation {
  createProject(
    title: "Zoro UK Clone"
    description: "Full-stack e-commerce application with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and checkout."
    image: "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"]
    demoUrl: "https://your-demo-url.com"
    githubUrl: "https://github.com/yourusername/zoro-clone"
    featured: true
    order: 1
  ) {
    id
    title
  }
}
```

## 📸 Adding Project Screenshots

### Option 1: Upload via Cloudinary Dashboard
1. Go to Cloudinary Dashboard
2. Upload your project screenshots
3. Copy the URL and use it in the `image` field

### Option 2: Use the ImageUpload Component
You can integrate the `ImageUpload` component into an admin page later.

## 🚢 Deploy to Vercel (FREE)

When you're ready to deploy:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio setup"
   git branch -M main
   git remote add origin https://github.com/yourusername/my-portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to **https://vercel.com**
   - Click "Import Project"
   - Select your GitHub repository
   - Add environment variables (copy from `.env.local`)
   - Click "Deploy"

3. **Your site will be live at:** `https://your-portfolio.vercel.app`

## 🎯 Testing Checklist

- [ ] Can you see the home page at http://localhost:3000?
- [ ] Does the navigation work?
- [ ] Can you submit the contact form?
- [ ] Can you add a project via GraphQL?
- [ ] Do projects show on the /projects page?

## 🐛 Troubleshooting

### "Error connecting to MongoDB"
- ✓ Check your MongoDB connection string in `.env.local`
- ✓ Make sure you replaced `<username>` and `<password>` with actual values
- ✓ Whitelist your IP address in MongoDB Atlas (Network Access → Add IP → Allow from Anywhere)

### "Cloudinary upload failed"
- ✓ Verify credentials in `.env.local`
- ✓ Check file size (must be under 10MB)
- ✓ Ensure file is a valid image format

### Port 3000 already in use
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9
# Then run again
npm run dev
```

## 📚 Useful Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Check for code issues
```

## 🎨 Customization Ideas

- Add a blog section
- Add dark mode toggle
- Add animations with Framer Motion
- Add a resume/CV download
- Add project filters by category
- Add testimonials section
- Add GitHub stats integration

## 💡 Tips

1. **Start small**: Get the basic site running first, then customize
2. **Test locally**: Always test changes locally before deploying
3. **Use version control**: Commit changes regularly
4. **Keep credentials safe**: Never commit `.env.local` to Git

## 🆘 Need Help?

- Next.js Docs: https://nextjs.org/docs
- Tailwind Docs: https://tailwindcss.com/docs
- GraphQL Docs: https://graphql.org/learn
- MongoDB Docs: https://www.mongodb.com/docs
- Cloudinary Docs: https://cloudinary.com/documentation

---

**You're almost done! Just fill in your credentials and run `npm run dev`** 🎉

