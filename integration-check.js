#!/usr/bin/env node

/**
 * SPACIFY Frontend Integration Test Script
 * 
 * This script helps verify that the frontend is properly configured
 * and ready to integrate with the backend.
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 SPACIFY Frontend Integration Check\n');

// Check required files
const requiredFiles = [
  '.env.local',
  'utils/api.ts',
  'contexts/AuthContext.tsx',
  'app/auth/login/page.tsx',
  'app/auth/signup/page.tsx',
  'components/RouteGuard.tsx',
  'components/Navbar.tsx'
];

console.log('📁 Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

console.log();

// Check environment variables
console.log('🔧 Checking environment configuration...');
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  if (envContent.includes('NEXT_PUBLIC_API_URL')) {
    console.log('   ✅ NEXT_PUBLIC_API_URL configured');
  } else {
    console.log('   ❌ NEXT_PUBLIC_API_URL not found in .env.local');
    allFilesExist = false;
  }
  
  if (envContent.includes('NODE_ENV')) {
    console.log('   ✅ NODE_ENV configured');
  } else {
    console.log('   ⚠️  NODE_ENV not configured (optional)');
  }
} else {
  console.log('   ❌ .env.local file not found');
  allFilesExist = false;
}

console.log();

// Check package.json scripts
console.log('📦 Checking package.json scripts...');
const packagePath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const scripts = packageJson.scripts || {};
  
  const requiredScripts = ['dev', 'build', 'start'];
  requiredScripts.forEach(script => {
    if (scripts[script]) {
      console.log(`   ✅ npm run ${script}`);
    } else {
      console.log(`   ❌ npm run ${script} - MISSING`);
      allFilesExist = false;
    }
  });
} else {
  console.log('   ❌ package.json not found');
  allFilesExist = false;
}

console.log();

// Integration readiness summary
console.log('📋 Integration Readiness Summary');
console.log('================================');

if (allFilesExist) {
  console.log('✅ Frontend is ready for backend integration!');
  console.log();
  console.log('Next steps:');
  console.log('1. Set up the Spacify-backend from the canvas');
  console.log('2. Start the backend server: npm start');
  console.log('3. Start the frontend: npm run dev');
  console.log('4. Test authentication flow');
  console.log();
  console.log('🔗 Backend endpoints expected:');
  console.log('   POST /api/auth/login');
  console.log('   POST /api/auth/register');
  console.log('   GET  /api/auth/verify');
  console.log('   POST /api/auth/logout');
  console.log('   GET  /api/parking-spots');
  console.log('   GET  /api/bookings');
  console.log();
} else {
  console.log('❌ Frontend setup incomplete. Please fix the issues above.');
  console.log();
}

// Backend integration checklist
console.log('🔍 Backend Integration Checklist');
console.log('================================');
console.log('□ Backend server running on http://localhost:5000');
console.log('□ Database connected and tables created');
console.log('□ JWT_SECRET configured in backend .env');
console.log('□ CORS enabled for frontend domain');
console.log('□ All API endpoints responding');
console.log('□ User registration/login working');
console.log('□ Token verification working');
console.log();

console.log('📖 For detailed backend setup, see the Spacify-backend canvas.');
console.log('📄 For complete integration guide, see README-INTEGRATION.md');
