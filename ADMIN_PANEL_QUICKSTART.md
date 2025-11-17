# Admin Panel Quick Start Guide

Get your BNomad admin panel up and running in 10 minutes!

## 🚀 Quick Setup (3 Easy Steps)

### Step 1: Configure Firebase (5 minutes)

**Option A: Interactive Setup (Recommended)**
```bash
npm run setup:firebase
```

Follow the prompts to enter your Firebase configuration values.

**Option B: Manual Setup**
1. Open `.env.local` in your project root
2. Replace placeholder values with your Firebase config
3. Save the file

**Where to get Firebase config values?**
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project (or select existing one)
- Go to Project Settings → General → Your apps
- Copy the configuration values

### Step 2: Enable Firebase Services (2 minutes)

In your Firebase Console:

1. **Enable Authentication**:
   - Build → Authentication → Get Started
   - Sign-in method → Email/Password → Enable
   - Save

2. **Create Firestore Database**:
   - Build → Firestore Database → Create Database
   - Start in production mode
   - Choose location (e.g., `asia-northeast3` for Korea)

3. **Set Firestore Rules**:
   - Click Rules tab
   - Paste this:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /posts/{postId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /contacts/{contactId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```
   - Publish

### Step 3: Create Admin User (1 minute)

In Firebase Console:
1. Authentication → Users → Add User
2. Email: `admin@bnomad.io` (or your email)
3. Password: [choose a strong password]
4. Add User

---

## ✅ Verify Setup

Check if everything is configured correctly:

```bash
npm run check:firebase
```

This will verify:
- ✅ `.env.local` exists
- ✅ All required variables are set
- ✅ Configuration values look valid
- ✅ Firebase integration files are present

---

## 🎯 Access Admin Panel

1. **Start dev server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Open admin login**:
   ```
   http://localhost:3000/en/admin/login
   ```

3. **Login** with the email/password you created

4. **You're in!** 🎉

---

## 📝 Admin Panel Features

### Dashboard (`/en/admin/dashboard`)
- View all blog posts (published and drafts)
- See post status, category, author, dates
- Quick actions: Edit, Delete
- Create new posts

### Create/Edit Posts (`/en/admin/posts/new`)
- **Bilingual editing**: Separate tabs for English and Korean
- **Rich content**: Markdown support with live preview
- **Metadata**:
  - Title (EN & KO)
  - Slug (auto-generated or custom)
  - Excerpt (EN & KO)
  - Content (EN & KO in Markdown)
- **Organization**:
  - Category: Journey, Insights, Reflections, Reports
  - Tags: Comma-separated keywords
  - Cover Image URL
- **Visibility**:
  - Featured toggle (shows on homepage)
  - Publish toggle (make visible to public)

### Blog Management
- **Edit**: Update any post
- **Delete**: Remove posts (with confirmation)
- **Draft**: Save without publishing
- **Publish**: Make posts visible on public blog

---

## 🌐 Public Pages

Once you publish posts, they appear on:

- **Blog listing**: `http://localhost:3000/en/blog`
- **Individual posts**: `http://localhost:3000/en/blog/[slug]`
- **Featured posts**: Show on homepage

---

## 💡 Tips & Best Practices

### Writing Blog Posts

1. **Use Markdown** for formatting:
   ```markdown
   # Heading 1
   ## Heading 2
   **Bold text**
   *Italic text*
   [Link text](https://example.com)
   ![Image alt](https://example.com/image.jpg)
   ```

2. **Slugs** should be:
   - Lowercase
   - Hyphen-separated
   - Descriptive (e.g., `our-journey-to-basque-country`)

3. **Excerpts** should be:
   - 1-2 sentences
   - Compelling hook to read more
   - Different from the first line of content

4. **Categories**:
   - **Journey**: Trip reports, travel stories
   - **Insights**: Lessons learned, observations
   - **Reflections**: Personal thoughts, philosophy
   - **Reports**: Formal updates, project reports

5. **Cover Images**:
   - Upload to Firebase Storage or use external URLs
   - Recommended size: 1200x630px (for social sharing)
   - Use high-quality images

### Managing Content

- **Drafts**: Use for work-in-progress posts
- **Featured**: Highlight 2-3 best posts on homepage
- **Tags**: Use 3-5 relevant tags per post
- **SEO**: Include keywords naturally in title and excerpt

---

## 🔧 Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
```bash
# Check your configuration
npm run check:firebase

# Re-run setup if needed
npm run setup:firebase

# Restart dev server
npm run dev
```

### "Cannot read properties of undefined"
- Make sure you restarted the dev server after updating `.env.local`
- Check all Firebase environment variables are set

### "Permission denied" when creating posts
- Verify Firestore security rules are set correctly
- Make sure you're logged in (check Firebase Console → Authentication → Users)

### Login page redirects back to login
- Check your Firebase email/password authentication is enabled
- Verify the user exists in Firebase Console → Authentication → Users
- Check browser console for error messages

---

## 📚 Additional Resources

- **Detailed Setup Guide**: `FIREBASE_SETUP.md`
- **Full Documentation**: `COMPLETION_GUIDE.md`
- **Firebase Console**: https://console.firebase.google.com/

---

## 🎉 You're All Set!

Your admin panel is ready to use. Start creating amazing content for BNomad!

Questions? Check the troubleshooting section or see `FIREBASE_SETUP.md` for detailed guidance.
