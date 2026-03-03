// This file is for server-side Firebase Admin SDK
// Use this for server actions and API routes
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
const apps = getApps();

if (!apps.length) {
  // For development, you can use a service account JSON file
  // For production (Netlify), use environment variables
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined;

  if (process.env.FIREBASE_PROJECT_ID && privateKey) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  } else {
    console.warn('Firebase Admin not initialized - missing environment variables');
  }
}

export const adminAuth = apps.length > 0 ? getAuth() : null;
export const adminDb = apps.length > 0 ? getFirestore() : null;
