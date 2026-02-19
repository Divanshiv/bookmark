# Bookmark Manager

A modern web application for managing and organizing your bookmarks with real-time sync, built with Next.js and Supabase.

## Features

- 🔐 **OAuth Authentication** - Google Sign-In integration
- 📌 **Bookmark Management** - Create, read, update, and delete bookmarks
- 🔄 **Real-time Sync** - Live updates across devices
- 🌙 **Dark Mode Support** - Theme toggle for comfortable viewing
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL), Server-side authentication
- **Authentication:** Next-Auth, Google OAuth
- **Real-time:** Supabase Real-time subscriptions
- **Validation:** Zod schema validation
- **Styling:** Tailwind CSS, shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google OAuth credentials

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Divanshiv/bookmark.git
   cd bookmark
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Supabase and Google OAuth credentials in `.env.local`

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
bookmark/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication routes
│   ├── dashboard/         # Dashboard pages
│   └── login/             # Login page
├── components/            # React components
│   ├── auth/              # Auth-related components
│   ├── dashboard/         # Dashboard components
│   ├── providers/         # Context providers
│   └── theme/             # Theme components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
│   └── supabase/          # Supabase clients
├── services/              # API services
├── types/                 # TypeScript types
└── supabase/              # Database migrations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions and [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for pre-deployment checklist.

Quick deployment options:
- **Vercel** - Recommended for Next.js
- **AWS** - EC2, ECS, or Lambda
- **Self-hosted** - Docker or traditional hosting

## API Routes

- `POST /api/auth/callback` - OAuth callback handler
- Bookmark operations handled via Supabase client

## Database Schema

See `supabase/migrations/` for database schema and migrations.

### Bookmarks Table

```sql
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT,
  url TEXT,
  description TEXT,
  tags TEXT[],
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## Authentication

- Uses Next-Auth for session management
- Google OAuth for sign-in
- Supabase RLS policies for data security

## Real-time Updates

Bookmarks are synced in real-time using Supabase subscriptions. Changes made on one device appear instantly on all others.

## Challenges & Solutions

**Supabase Connectivity Issues** - Initial deployment failed due to environment variables not being configured in Vercel. Fixed with proper .env setup and validation in `lib/env.ts`.

**Real-time Connection Pool Exhaustion** - Subscriptions weren't cleaning up on component unmount, draining the connection pool. Solved by adding proper cleanup logic in `use-bookmarks-realtime.ts`.

**RLS Policies Blocking Queries** - After enabling Row-Level Security, authenticated queries failed with 403 errors. Required explicit RLS policy creation for SELECT and INSERT operations.

**Learning Supabase** - First time working with Supabase, PostgreSQL, and JWT auth. Leveraged documentation, Supabase Discord community, and iterative debugging to overcome the learning curve.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please reach out to divanshivkumar.7@gmail.com

---

Made with ❤️ by Divanshiv
