# NULLSIGHT Interstellar Fleet

> A Star Citizen themed React/TypeScript/Bootstrap web portal for the NULLSIGHT organization.

**Live site:** https://ayersdecker.github.io/nullsightinterstellarfleet/

**RSI Org:** https://robertsspaceindustries.com/en/orgs/NULLSIGHT

---

## Features

- 🚀 **Star Citizen themed UI** — dark tech aesthetic with cyan/gold accents, Orbitron & Rajdhani fonts, animated starfield background
- 🔐 **Firebase Authentication** — register/sign in with email + Star Citizen handle
- 👥 **Fleet Management** — member roster with search, division overview, ship registry with per-division filtering
- 🛸 **Pilot Profile** — view/edit SC handle, display name, hangar registry, division assignment
- 📊 **Dashboard** — fleet stats, announcements, upcoming ops schedule, quick actions
- 📧 **Email Subscriptions** — subscribe to fleet communications via Firestore
- 📱 **Responsive** — Bootstrap grid, mobile-friendly navbar

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript |
| Styling | Bootstrap 5 + React-Bootstrap + Custom CSS |
| Routing | React Router DOM v7 |
| Backend | Firebase (Auth + Firestore) |
| Build | Vite 8 |
| Hosting | GitHub Pages |
| Icons | react-icons |

## Pages

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Landing page with org overview, stats, features, subscribe | No |
| `/login` | Firebase email/password login | No |
| `/register` | Account creation with SC handle | No |
| `/fleet` | Member roster + ship registry | No |
| `/dashboard` | Fleet stats, announcements, ops schedule | ✅ Yes |
| `/profile` | Pilot record, hangar management | ✅ Yes |

## Setup & Development

### 1. Clone and install

```bash
git clone https://github.com/ayersdecker/nullsightinterstellarfleet.git
cd nullsightinterstellarfleet
npm install
```

### 2. Configure Firebase

1. Create a [Firebase project](https://console.firebase.google.com/)
2. Enable **Authentication** (Email/Password provider)
3. Enable **Firestore Database**
4. Copy `.env.example` to `.env.local` and fill in your Firebase config values:

```bash
cp .env.example .env.local
```

### 3. Add required GitHub Secrets (for CI/CD)

In your repository settings → Secrets and Variables → Actions, add:

| Secret | Value |
|--------|-------|
| `VITE_FIREBASE_API_KEY` | Your Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | e.g. `your-project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Your project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | e.g. `your-project.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Your app ID |

### 4. Run locally

```bash
npm run dev
```

Open http://localhost:5173/nullsightinterstellarfleet/

### 5. Build for production

```bash
npm run build
```

## Deployment

The site is automatically deployed to GitHub Pages when pushing to `main` via the GitHub Actions workflow in `.github/workflows/deploy.yml`.

> Make sure GitHub Pages is configured to deploy from **GitHub Actions** (not a branch) in your repository Settings → Pages.

## Firestore Collections

| Collection | Purpose |
|------------|---------|
| `users` | Pilot profiles (scHandle, displayName, rank, ships, division) |
| `subscribers` | Email subscriptions for fleet comms |

## License

MIT — see [LICENSE](LICENSE)

---

*This site is not affiliated with Cloud Imperium Games or Roberts Space Industries. Star Citizen® is a registered trademark of Cloud Imperium Games Corp.*
