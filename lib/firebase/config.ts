import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
// TODO: Replace with your actual Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

// Check if Firebase config is valid (not placeholder or empty)
const isValidConfig = firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== 'placeholder' &&
  firebaseConfig.apiKey !== '';

// Initialize Firebase only if we have valid configuration
let app;
if (isValidConfig) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
} else {
  // Create a mock app for build time - will be replaced at runtime
  app = null as any;
}

// Initialize Firebase services only if app is valid
export const auth = app ? getAuth(app) : null as any;
export const db = app ? getFirestore(app) : null as any;
export const storage = app ? getStorage(app) : null as any;

export default app;
