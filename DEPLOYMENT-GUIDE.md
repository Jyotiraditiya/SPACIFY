# 🚀 SPACIFY Frontend Deployment Guide

This guide covers multiple deployment options for your SPACIFY Next.js frontend application.

## 📋 Pre-Deployment Checklist

Before deploying, ensure:
- [ ] Frontend builds successfully (`npm run build`)
- [ ] Backend is deployed and accessible
- [ ] Environment variables are configured
- [ ] All tests pass
- [ ] API endpoints are working

## 🌟 Recommended Deployment Options

### 1. 🔷 Vercel (Recommended for Next.js)

Vercel is the company behind Next.js and offers the best Next.js hosting experience.

#### **Quick Deploy with GitHub**

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js configuration

3. **Configure Environment Variables**:
   In Vercel dashboard → Project Settings → Environment Variables:
   ```
   NEXT_PUBLIC_API_URL = https://your-backend-domain.com/api
   NODE_ENV = production
   ```

4. **Deploy**:
   - Click "Deploy"
   - Vercel automatically builds and deploys
   - Get your live URL: `https://your-app.vercel.app`

#### **Vercel CLI Deployment**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Follow prompts to configure project
```

#### **Vercel Benefits**:
- ✅ Zero configuration for Next.js
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments for PRs
- ✅ Automatic deployments on git push
- ✅ Free tier available

---

### 2. 🟢 Netlify

Great alternative with excellent CI/CD integration.

#### **Deploy with Git**

1. **Push to GitHub/GitLab**:
   ```bash
   git add .
   git commit -m "Deploy to Netlify"
   git push origin main
   ```

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login
   - Click "New site from Git"
   - Connect your repository

3. **Build Settings**:
   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL = https://your-backend-domain.com/api
   NODE_ENV = production
   ```

#### **Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=.next
```

---

### 3. ☁️ AWS (Amazon Web Services)

For enterprise-level deployments with full control.

#### **AWS Amplify (Easiest)**

1. **Install AWS Amplify CLI**:
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. **Initialize Amplify**:
   ```bash
   amplify init
   amplify add hosting
   amplify publish
   ```

3. **Connect Git Repository**:
   - AWS Amplify Console
   - Connect GitHub repository
   - Configure build settings

#### **AWS S3 + CloudFront (Advanced)**

1. **Build the application**:
   ```bash
   npm run build
   npm run export  # If using static export
   ```

2. **Upload to S3**:
   ```bash
   aws s3 sync .next s3://your-bucket-name --delete
   ```

3. **Configure CloudFront** for global CDN

---

### 4. 🐳 Docker Deployment

For containerized deployments on any cloud provider.

#### **Create Dockerfile**

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### **Build and Run Docker**

```bash
# Build image
docker build -t spacify-frontend \
  --build-arg NEXT_PUBLIC_API_URL=https://your-backend-url.com/api .

# Run container
docker run -p 3000:3000 spacify-frontend
```

#### **Deploy to Docker Platforms**:
- **Digital Ocean App Platform**
- **Google Cloud Run**
- **Azure Container Instances**
- **AWS ECS/Fargate**

---

### 5. 🔵 Azure Static Web Apps

Perfect for Microsoft Azure ecosystem.

#### **Deploy via GitHub Actions**

1. **Azure Portal**:
   - Create new Static Web App
   - Connect GitHub repository
   - Azure creates GitHub Action automatically

2. **Configure Build**:
   ```yaml
   # .github/workflows/azure-static-web-apps.yml
   app_location: "/"
   output_location: ".next"
   app_build_command: "npm run build"
   ```

3. **Environment Variables**:
   Set in Azure Portal → Configuration

---

### 6. 🔴 DigitalOcean App Platform

Simple and cost-effective deployment.

#### **One-Click Deploy**

1. **Create App**:
   - DigitalOcean Control Panel
   - Apps → Create App
   - Connect GitHub repository

2. **Configure**:
   ```yaml
   # Build Command
   npm run build
   
   # Run Command
   npm start
   
   # Environment Variables
   NEXT_PUBLIC_API_URL=https://your-backend.com/api
   ```

---

## 🔧 Environment Configuration for Production

### **Frontend Environment Variables**

Create production environment variables:

```env
# Production .env.local (or in hosting platform)
NEXT_PUBLIC_API_URL=https://your-production-backend.com/api
NODE_ENV=production
```

### **Backend Considerations**

Ensure your backend:
- Is deployed and accessible
- Has CORS configured for your frontend domain
- Uses HTTPS in production
- Has proper error handling
- Database is production-ready

---

## 🌐 Custom Domain Setup

### **For Vercel**
```bash
# Add custom domain in Vercel dashboard
# DNS settings:
# Type: CNAME
# Name: www (or @)
# Value: cname.vercel-dns.com
```

### **For Netlify**
```bash
# Add custom domain in Netlify dashboard
# DNS settings:
# Type: CNAME
# Name: www
# Value: your-site.netlify.app
```

---

## 🔒 Security Considerations

### **HTTPS/SSL**
- ✅ Most platforms provide automatic HTTPS
- ✅ Use HTTPS for all API communications
- ✅ Secure cookie settings in production

### **Environment Variables**
- ✅ Never commit `.env` files to git
- ✅ Use platform-specific environment variable settings
- ✅ Validate all environment variables on startup

### **CORS Configuration**
Ensure backend allows requests from your domain:
```javascript
// Backend CORS settings
app.use(cors({
  origin: [
    'https://your-frontend-domain.com',
    'https://www.your-frontend-domain.com'
  ],
  credentials: true
}));
```

---

## 📊 Performance Optimization

### **Before Deployment**
```bash
# Optimize bundle size
npm run build
npm run analyze  # If bundle analyzer is configured

# Check performance
npm run lighthouse  # If configured
```

### **Next.js Optimizations**
- ✅ Image optimization enabled
- ✅ Code splitting configured
- ✅ Static generation where possible
- ✅ CDN for static assets

---

## 🐛 Deployment Troubleshooting

### **Common Issues**

#### **Build Failures**
```bash
# Check build locally first
npm run build

# Fix TypeScript errors
npm run type-check

# Fix linting issues
npm run lint
```

#### **Environment Variable Issues**
- Ensure `NEXT_PUBLIC_` prefix for client-side variables
- Check case sensitivity
- Verify values don't contain quotes unless needed

#### **API Connection Issues**
- Verify backend URL is correct
- Check CORS configuration
- Ensure HTTPS if frontend uses HTTPS

### **Debug Deploy Issues**

```bash
# Check deployment logs
vercel logs your-deployment-url

# Test production build locally
npm run build
npm start
```

---

## 💰 Cost Comparison

| Platform | Free Tier | Paid Plans | Best For |
|----------|-----------|------------|----------|
| **Vercel** | 100GB bandwidth | $20/month | Next.js apps |
| **Netlify** | 100GB bandwidth | $19/month | Static sites |
| **AWS Amplify** | 5GB storage | Pay-as-use | Enterprise |
| **DigitalOcean** | None | $5/month | Simple apps |
| **Azure** | 100GB bandwidth | Pay-as-use | Microsoft stack |

---

## 🚀 Quick Start Deployment

### **Fastest Option (Vercel)**:
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Follow prompts
# 4. Set environment variables in dashboard
# 5. Done! 🎉
```

### **Environment Setup**:
```bash
# Set in hosting platform dashboard:
NEXT_PUBLIC_API_URL=https://your-backend.herokuapp.com/api
```

---

## 📞 Need Help?

If you encounter issues:
1. Check the hosting platform's documentation
2. Verify environment variables are set correctly
3. Test the build locally first: `npm run build && npm start`
4. Check deployment logs for specific errors
5. Ensure backend is accessible from the frontend domain

**Recommended**: Start with **Vercel** for the simplest Next.js deployment experience! 🎯
