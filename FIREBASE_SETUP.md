# Firebase Setup Guide for BNomad Admin Panel

This guide will help you set up Firebase to enable the admin panel functionality.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: **`bnomad-website`**
4. (Optional) Disable Google Analytics if you don't need it
5. Click **"Create project"**
6. Wait for the project to be created, then click **"Continue"**

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`) to add a web app
2. Register app:
   - App nickname: `BNomad Website`
   - **DO NOT** check "Also set up Firebase Hosting"
3. Click **"Register app"**
4. You'll see the Firebase configuration object - **keep this page open**, you'll need these values

## Step 3: Configure Firebase Authentication

1. In the left sidebar, click **"Build"** → **"Authentication"**
2. Click **"Get started"**
3. Click on **"Email/Password"** under "Sign-in method"
4. Toggle **"Email/Password"** to **Enabled**
5. Click **"Save"**

## Step 4: Create Firestore Database

1. In the left sidebar, click **"Build"** → **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll set up rules next)
4. Select a location closest to your users (e.g., `asia-northeast3` for Korea)
5. Click **"Enable"**

### Set Up Firestore Security Rules

Once the database is created:
1. Click on the **"Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blog posts - public read, admin write
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Contacts - admin only
    match /contacts/{contactId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

## Step 5: Get Your Firebase Configuration

1. Go to **Project settings** (gear icon in left sidebar)
2. Scroll down to **"Your apps"** section
3. You'll see your web app configuration. Copy these values:

```javascript
{
  apiKey: "AIza...",
  authDomain: "bnomad-website-xxxxx.firebaseapp.com",
  projectId: "bnomad-website-xxxxx",
  storageBucket: "bnomad-website-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
}
```

## Step 6: Update Your .env.local File

1. Open `.env.local` in your project root
2. Replace the placeholder values with your actual Firebase configuration:

```bash
# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=bnomad-website-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=bnomad-website-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=bnomad-website-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef...
```

3. Save the file

## Step 7: Restart Your Development Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## Step 8: Create Your First Admin User

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your **bnomad-website** project
3. Click **"Authentication"** in the left sidebar
4. Click the **"Users"** tab
5. Click **"Add user"**
6. Enter:
   - Email: `admin@bnomad.io` (or your preferred admin email)
   - Password: Choose a strong password (at least 6 characters)
7. Click **"Add user"**

## Step 9: Test Admin Login

1. Open your browser to: `http://localhost:3000/en/admin/login`
2. Enter the email and password you just created
3. Click **"Sign In"**
4. You should be redirected to the admin dashboard!

---

## Admin Panel Features

Once logged in, you can:

### Blog Management
- **View all posts**: See published and draft posts
- **Create new posts**: Click "New Post" button
  - Write bilingual content (English & Korean tabs)
  - Add categories, tags, and featured image URLs
  - Mark as featured or publish immediately
- **Edit posts**: Click "Edit" on any post
- **Delete posts**: Click "Delete" with confirmation

### Contact Form Submissions
- View all contact form submissions in Firestore
- Access via Firebase Console → Firestore Database → `contacts` collection

---

## Quick Reference: Admin URLs

- **Admin Login**: `http://localhost:3000/en/admin/login`
- **Admin Dashboard**: `http://localhost:3000/en/admin/dashboard`
- **Create New Post**: `http://localhost:3000/en/admin/posts/new`

---

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Check that your `NEXT_PUBLIC_FIREBASE_API_KEY` in `.env.local` is correct
- Restart your dev server after updating `.env.local`

### "Firebase: Error (auth/wrong-password)" or "auth/user-not-found"
- Verify you created the user in Firebase Console → Authentication → Users
- Check that you're using the correct email and password

### Admin panel not loading
- Make sure you've enabled Email/Password authentication in Firebase Console
- Check browser console for any error messages
- Verify all Firebase config values are set in `.env.local`

### Can't create blog posts
- Check Firestore security rules allow authenticated users to write
- Verify you're logged in (check for user avatar in navigation)

---

## Security Notes

- **Never commit** your `.env.local` file to Git (it's already in `.gitignore`)
- Use strong passwords for admin accounts
- Consider adding email verification for production
- Review Firestore security rules before deploying to production

---

## Next Steps After Setup

1. ✅ Test admin login
2. ✅ Create a test blog post
3. ✅ Verify the blog post appears on the public blog page
4. ✅ Test the contact form
5. 🚀 Deploy to Netlify (add environment variables there too!)
