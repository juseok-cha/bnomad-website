#!/usr/bin/env node

/**
 * Firebase Configuration Checker
 *
 * This script verifies your Firebase configuration is set up correctly.
 * Run: node scripts/check-firebase.js
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function check(condition, message) {
  if (condition) {
    log(`✅ ${message}`, 'green');
    return true;
  } else {
    log(`❌ ${message}`, 'red');
    return false;
  }
}

function warn(message) {
  log(`⚠️  ${message}`, 'yellow');
}

async function main() {
  log('\n🔍 Firebase Configuration Checker\n', 'bright');

  let allChecks = true;

  // Check if .env.local exists
  const envPath = path.join(process.cwd(), '.env.local');
  const envExists = fs.existsSync(envPath);

  allChecks = check(envExists, '.env.local file exists') && allChecks;

  if (!envExists) {
    log('\n❌ .env.local file not found!', 'red');
    log('Run: node scripts/setup-firebase.js', 'cyan');
    log('Or see: FIREBASE_SETUP.md for manual setup\n', 'cyan');
    return;
  }

  // Read .env.local
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envVars = {};

  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#][^=]+)=(.+)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      envVars[key] = value;
    }
  });

  // Check required variables
  const requiredVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
  ];

  log('\n📝 Checking required environment variables:\n');

  requiredVars.forEach(varName => {
    const exists = !!envVars[varName];
    const isPlaceholder = envVars[varName]?.includes('your_') || envVars[varName]?.includes('your-project');

    if (exists && !isPlaceholder) {
      check(true, `${varName} is set`);
    } else if (exists && isPlaceholder) {
      allChecks = false;
      log(`❌ ${varName} contains placeholder value`, 'red');
    } else {
      allChecks = false;
      check(false, `${varName} is missing`);
    }
  });

  // Check Firebase config values look valid
  log('\n🔧 Validating configuration values:\n');

  if (envVars['NEXT_PUBLIC_FIREBASE_API_KEY']) {
    allChecks = check(
      envVars['NEXT_PUBLIC_FIREBASE_API_KEY'].startsWith('AIza'),
      'API Key format looks valid (starts with AIza)'
    ) && allChecks;
  }

  if (envVars['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN']) {
    allChecks = check(
      envVars['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'].includes('firebaseapp.com'),
      'Auth Domain format looks valid (contains firebaseapp.com)'
    ) && allChecks;
  }

  if (envVars['NEXT_PUBLIC_FIREBASE_PROJECT_ID']) {
    allChecks = check(
      !envVars['NEXT_PUBLIC_FIREBASE_PROJECT_ID'].includes('your-project'),
      'Project ID is not a placeholder'
    ) && allChecks;
  }

  // Check if Firebase files exist
  log('\n📁 Checking Firebase integration files:\n');

  const files = [
    'lib/firebase/config.ts',
    'lib/firebase/blogService.ts',
    'lib/contexts/AuthContext.tsx',
    'app/[lang]/admin/login/page.tsx',
    'app/[lang]/admin/dashboard/page.tsx',
  ];

  files.forEach(file => {
    const exists = fs.existsSync(path.join(process.cwd(), file));
    check(exists, `${file} exists`);
  });

  // Summary
  log('\n' + '='.repeat(60) + '\n');

  if (allChecks) {
    log('🎉 All checks passed! Your Firebase configuration looks good.\n', 'green');
    log('Next steps:', 'bright');
    log('1. Make sure you\'ve created a Firestore database', 'yellow');
    log('2. Enable Email/Password authentication', 'yellow');
    log('3. Create an admin user in Firebase Console', 'yellow');
    log('4. Set up Firestore security rules', 'yellow');
    log('5. Restart your dev server: npm run dev', 'yellow');
    log('6. Try logging in at: http://localhost:3000/en/admin/login\n', 'yellow');
  } else {
    log('❌ Some checks failed. Please fix the issues above.\n', 'red');
    log('For setup help, see:', 'yellow');
    log('  • FIREBASE_SETUP.md - Detailed setup guide', 'cyan');
    log('  • node scripts/setup-firebase.js - Interactive setup\n', 'cyan');
  }
}

main().catch((error) => {
  log(`\n❌ Error: ${error.message}`, 'red');
  process.exit(1);
});
