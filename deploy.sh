#!/bin/bash

# SPACIFY Frontend Deployment Script
# This script helps prepare and deploy your frontend

echo "🚀 SPACIFY Frontend Deployment Helper"
echo "====================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo ""
echo "📋 Pre-deployment checks..."

# Check Node.js version
if command_exists node; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js: $NODE_VERSION"
else
    echo "❌ Node.js not found"
    exit 1
fi

# Check npm
if command_exists npm; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm: $NPM_VERSION"
else
    echo "❌ npm not found"
    exit 1
fi

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ Environment file found"
    
    # Check if API URL is set
    if grep -q "NEXT_PUBLIC_API_URL" .env.local; then
        API_URL=$(grep "NEXT_PUBLIC_API_URL" .env.local | cut -d '=' -f2)
        echo "✅ API URL configured: $API_URL"
    else
        echo "⚠️  NEXT_PUBLIC_API_URL not found in .env.local"
    fi
else
    echo "⚠️  .env.local not found - you'll need to set environment variables in your hosting platform"
fi

echo ""
echo "🔨 Building application..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Run build
echo "Building for production..."
if npm run build; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo ""
echo "🎯 Choose your deployment platform:"
echo "1. Vercel (Recommended for Next.js)"
echo "2. Netlify"
echo "3. Docker"
echo "4. Manual/Other"

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🔷 Vercel Deployment"
        echo "==================="
        if command_exists vercel; then
            echo "Vercel CLI found. Deploying..."
            vercel --prod
        else
            echo "Vercel CLI not found. Installing..."
            npm install -g vercel
            echo "Now run: vercel --prod"
        fi
        echo ""
        echo "💡 Tip: Set environment variables in Vercel dashboard:"
        echo "   NEXT_PUBLIC_API_URL = https://your-backend-domain.com/api"
        ;;
    2)
        echo ""
        echo "🟢 Netlify Deployment"
        echo "===================="
        if command_exists netlify; then
            echo "Netlify CLI found. Deploying..."
            netlify deploy --prod --dir=.next
        else
            echo "Netlify CLI not found. Installing..."
            npm install -g netlify-cli
            echo "Now run: netlify deploy --prod --dir=.next"
        fi
        echo ""
        echo "💡 Tip: Set build command to 'npm run build' and publish directory to '.next'"
        ;;
    3)
        echo ""
        echo "🐳 Docker Deployment"
        echo "==================="
        if command_exists docker; then
            echo "Docker found. Building image..."
            
            # Get API URL for Docker build
            read -p "Enter your backend API URL (e.g., https://api.example.com/api): " BACKEND_URL
            
            docker build -t spacify-frontend \
                --build-arg NEXT_PUBLIC_API_URL="$BACKEND_URL" .
            
            echo "✅ Docker image built successfully!"
            echo "To run: docker run -p 3000:3000 spacify-frontend"
        else
            echo "Docker not found. Please install Docker first."
        fi
        ;;
    4)
        echo ""
        echo "📝 Manual Deployment"
        echo "==================="
        echo "Your build is ready in the .next directory"
        echo ""
        echo "For static hosting:"
        echo "1. Run: npm run export (if configured)"
        echo "2. Upload the 'out' directory to your hosting provider"
        echo ""
        echo "For server hosting:"
        echo "1. Upload all files to your server"
        echo "2. Run: npm ci --production"
        echo "3. Run: npm start"
        echo ""
        echo "Don't forget to set environment variables:"
        echo "NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api"
        ;;
    *)
        echo "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "📋 Post-deployment checklist:"
echo "□ Set environment variables in hosting platform"
echo "□ Configure custom domain (if needed)"
echo "□ Test authentication flow"
echo "□ Verify API connections"
echo "□ Check all pages load correctly"
echo "□ Test on mobile devices"
echo ""
echo "📖 For detailed deployment instructions, see DEPLOYMENT-GUIDE.md"
echo "🔗 Frontend URL: [Will be provided by your hosting platform]"
echo "🔗 Backend URL: [Ensure this matches your NEXT_PUBLIC_API_URL]"
