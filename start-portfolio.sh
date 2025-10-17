#!/bin/bash

# Portfolio Quick Start Script
# This script helps you get started with your portfolio

clear

echo "═══════════════════════════════════════════════════════════════"
echo "   🚀 MY PORTFOLIO - QUICK START"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ ERROR: .env.local file not found!"
    echo ""
    echo "Please create .env.local with your credentials:"
    echo "  1. Copy .env.local.example to .env.local"
    echo "  2. Update with your MongoDB and Cloudinary credentials"
    echo ""
    exit 1
fi

# Check if credentials are still placeholder values
if grep -q "your_cloud_name" .env.local || grep -q "username:password" .env.local; then
    echo "⚠️  WARNING: Looks like you haven't updated your credentials yet!"
    echo ""
    echo "Please update .env.local with your actual credentials:"
    echo ""
    echo "1. MongoDB Atlas (FREE):"
    echo "   → Visit: https://www.mongodb.com/atlas/database"
    echo "   → Create free cluster"
    echo "   → Get connection string"
    echo ""
    echo "2. Cloudinary (FREE 25GB):"
    echo "   → Visit: https://cloudinary.com/users/register/free"
    echo "   → Get Cloud Name, API Key, API Secret"
    echo ""
    echo "Then update .env.local and run this script again."
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "✅ Environment variables found!"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "✅ Dependencies installed!"
echo ""

# Check Node version
NODE_VERSION=$(node -v)
echo "📌 Node version: $NODE_VERSION"
echo ""

echo "═══════════════════════════════════════════════════════════════"
echo "   🎉 STARTING YOUR PORTFOLIO..."
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Your portfolio will be available at:"
echo "   🌐 http://localhost:3000"
echo ""
echo "API Endpoints:"
echo "   📊 GraphQL: http://localhost:3000/api/graphql"
echo "   🔌 REST API: http://localhost:3000/api/projects"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Start the development server
npm run dev

