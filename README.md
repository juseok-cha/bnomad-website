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
git clone <repository-url>
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

## 📝 Content Management

### Blog Posts (Admin Only)
- Only authenticated admin users can create/edit blog posts
- Posts are stored in Firebase Firestore
- Supports markdown formatting
- SEO-optimized

## 🚀 Deployment

### Netlify Deployment

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables in Netlify dashboard (same as `.env`)
5. Deploy!

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

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## 🗺️ Roadmap

- [ ] Complete all page implementations
- [ ] Add blog admin panel
- [ ] Implement contact form with Firebase
- [ ] Add image galleries for programs
- [ ] Interactive Jeju House asset map
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Analytics integration

## 📄 License

© 2024 BNomad. All rights reserved.

## 🤝 Contributing

This is a private project for BNomad. For any questions or contributions, please contact the development team.