# BNomad Website

Official website for BNomad - Venture Studio for Glocal Innovation with Soul and Authenticity.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Chakra UI
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Hosting**: Netlify
- **Internationalization**: Route-based i18n (English & Korean)

## 📁 Project Structure

```
bnomad-website/
├── app/
│   ├── [lang]/              # i18n routing
│   │   ├── page.tsx         # Landing page
│   │   ├── layout.tsx       # Language-specific layout
│   │   ├── about/
│   │   ├── programs/
│   │   ├── projects/
│   │   ├── blog/
│   │   ├── team/
│   │   ├── contact/
│   │   └── jeju-house/
│   ├── globals.css
│   ├── layout.tsx           # Root layout
│   └── providers.tsx        # Chakra UI provider
├── components/
│   ├── layout/              # Navigation, Footer
│   ├── sections/            # Hero, About, Programs, CTA
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── firebase/            # Firebase config
│   └── i18n/                # Internationalization
│       ├── dictionaries.ts
│       └── locales/
│           ├── en.json
│           └── ko.json
└── public/
    └── images/
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/juseok-cha/bnomad-website.git
cd bnomad-website
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Add your Firebase configuration to `.env`:

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing
   - Go to Project Settings > General
   - Copy the Firebase config values to `.env`

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Internationalization

The website supports bilingual content (English & Korean) using route-based language switching:

- English: `/en/...`
- Korean: `/ko/...`

Language files are located in `lib/i18n/locales/`.

## 🔥 Firebase Setup

### Required Firebase Services:

- **Authentication**: For blog admin access
- **Firestore**: For blog posts and content storage
- **Storage**: For image uploads

### Setting up Firebase:

1. Create a Firebase project
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Enable Storage
5. Add Firebase config to `.env`

## 📝 Content Management & Blog System

### Blog Admin Panel

The website includes a full-featured blog admin system with authentication:

**Access**: `/[lang]/admin/login`

#### Features:

- **Firebase Authentication**: Secure email/password login for admin users
- **Admin Dashboard** (`/[lang]/admin/dashboard`):
  - View all blog posts (published and drafts)
  - Edit, delete, and manage posts
  - See post status, category, and publish dates
- **Post Editor** (`/[lang]/admin/posts/new`):
  - Bilingual content editor (English & Korean)
  - Markdown support with syntax highlighting
  - Category selection (Journey, Insights, Reflections, Reports)
  - Tag management
  - Featured post toggle
  - Publish/draft control
  - Auto-generated URL slugs

#### Public Blog Pages:

- **Blog Listing** (`/[lang]/blog`): Display all published posts with category badges
- **Individual Post** (`/[lang]/blog/[slug]`): Full post view with markdown rendering

### Contact Form

- Firebase-powered contact form (`/[lang]/contact`)
- Messages stored in Firestore `contacts` collection
- Bilingual form with validation

## 🚀 Deployment

### Netlify Deployment

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables in Netlify dashboard (same as `.env`)
5. Deploy!

## 🤝 GitHub Workflow

- **Create a branch**: `git checkout -b feature/short-description` for new work.
- **Commit often**: add clear commit messages that explain the change.
- **Pull before pushing**: `git pull --rebase origin main` to keep your branch up to date.
- **Open a PR**: push the branch to GitHub and open a pull request targeting `main`.
- **Code review**: incorporate feedback, ensure checks pass, and then merge via GitHub.

### Netlify Plugin

The project uses `@netlify/plugin-nextjs` for optimal Next.js deployment.

## 🎨 Customization

### Colors

Brand colors are defined in `app/providers.tsx`. Modify the theme object to customize:

- `brand`: Primary blue color scheme
- `accent`: Secondary orange color scheme

### Content

All text content is in `lib/i18n/locales/`:

- Edit `en.json` for English content
- Edit `ko.json` for Korean content

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🔒 Environment Variables

Required environment variables (see `.env.example`):

### Client-side Firebase Config:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Server-side Firebase Admin SDK (Optional):

```bash
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Setting up Admin User:

1. Go to Firebase Console > Authentication
2. Add a new user with email/password
3. Use these credentials to login at `/[lang]/admin/login`

## 🗺️ Roadmap

### ✅ Completed:

- [x] Landing page with Hero, About, Programs, and CTA sections
- [x] Bilingual routing (English & Korean)
- [x] Blog admin panel with authentication
- [x] Blog post editor with markdown support
- [x] Public blog listing and individual post pages
- [x] About page with timeline
- [x] Contact form with Firebase integration
- [x] Responsive navigation and footer

### 🚧 In Progress / Future:

- [ ] Programs detail pages (Spain Roadtrip, Lab Tour, etc.)
- [ ] Projects showcase page
- [ ] Team page with member profiles
- [ ] Jeju House interactive page
- [ ] Image upload for blog posts
- [ ] SEO optimization (meta tags, sitemap)
- [ ] Performance optimization
- [ ] Analytics integration
- [ ] Newsletter signup

## 📄 License

© 2024 BNomad. All rights reserved.

## 🤝 Contributing

This is a private project for BNomad. For any questions or contributions, please contact the development team.
