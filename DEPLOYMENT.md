# Vercel Deployment Guide

This guide will walk you through deploying the Bookmark App to Vercel.

## Pre-Deployment Checklist ✅

- ✅ Production build passes (`npm run build`)  
- ✅ No ESLint errors (`npm run lint`)
- ✅ TypeScript compiles cleanly
- ✅ Environment variables properly configured
- ✅ .gitignore includes `.env.local` and sensitive files
- ✅ All dependencies are in package.json
- ✅ Database migrations are prepared

---

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: Bookmark app ready for Vercel deployment"
git branch -M main
git remote add origin https://github.com/<your-username>/bookmark-app.git
git push -u origin main
```

---

## Step 2: Create Vercel Account & Project

### 2.1 Create a Vercel Account
- Visit [vercel.com](https://vercel.com)
- Sign up with GitHub, GitLab, or Bitbucket
- Authorize Vercel to access your repositories

### 2.2 Import Project to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Select your GitHub account
3. Find and select your bookmark-app repository
4. Click "Import"

---

## Step 3: Configure Environment Variables

### 3.1 Add Supabase Credentials to Vercel

In the Vercel project settings, add these **environment variables**:

| Variable | Value | Example |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL | `https://zlsueawzhsqushcslylr.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon Key | `sb_publishable_bnMHElgiFGCnYt5jHR7rkQ_8AhKnwBp` |

**How to find these values:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings → API**
4. Copy `Project URL` and `anon` key
5. Paste into Vercel project settings under "Environment Variables"

### 3.2 Deploy Configuration
- **Framework**: Next.js
- **Build Command**: `npm run build` (automatic)
- **Output Directory**: `.next` (automatic)
- **Install Command**: `npm install` (automatic)

---

## Step 4: Configure Supabase OAuth

### 4.1 Update OAuth Redirect URLs in Supabase

Your Vercel deployment URL will look like: `https://your-app-name.vercel.app`

1. Go to Supabase Dashboard → Your Project
2. Navigate to **Authentication → Providers**
3. Select **Google**
4. Under "Redirect URL" section, add:
   ```
   https://your-app-name.vercel.app/auth/callback
   ```
   (Replace `your-app-name` with your actual Vercel project name)

### 4.2 Ensure Google OAuth is Enabled
- Make sure Google provider is **enabled** in Supabase
- Verify you have Google OAuth credentials configured in Supabase

### 4.3 Update Allowed Callback URLs (if using Supabase CLI)
```bash
# For local development
http://localhost:3000/auth/callback

# For Vercel production
https://your-app-name.vercel.app/auth/callback
```

---

## Step 5: Set Up Database

### 5.1 Apply Database Migrations

The SQL migration is already prepared in `supabase/migrations/20260212172837_create_bookmarks_table.sql`

**Option A: Using Supabase Dashboard** (Recommended for first deployment)
1. Go to Supabase Dashboard → Your Project
2. Navigate to **SQL Editor**
3. Click "New Query"
4. Copy the contents from `supabase/migrations/20260212172837_create_bookmarks_table.sql`
5. Paste and execute the SQL

**Option B: Using Supabase CLI**
```bash
npx -y supabase link --project-ref <your-project-ref>
npm run db:push
```

### 5.2 Verify Database Setup
- Check that `public.bookmarks` table is created
- Verify RLS (Row Level Security) policies are in place
- Confirm the table has columns: `id`, `user_id`, `title`, `url`, `created_at`

---

## Step 6: Deploy 🚀

### 6.1 Automatic Deployment
Once environment variables are set:
1. Vercel will automatically deploy when you push to GitHub
2. You'll see deployment progress in the Vercel Dashboard
3. Once complete, your app will be live at `https://your-app-name.vercel.app`

### 6.2 Manual Redeployment
If needed, you can redeploy from the Vercel Dashboard:
1. Go to your project
2. Click "Deployments"
3. Find the deployment you want
4. Click "..." → "Redeploy"

---

## Step 7: Test Your Deployment

### 7.1 Test Core Features
1. **Visit your app**: `https://your-app-name.vercel.app`
2. **Test Google Login**: Click "Sign In with Google"
3. **Add a Bookmark**: Try adding a new bookmark
4. **Delete a Bookmark**: Verify delete works
5. **Real-time Updates**: Open app in two browser tabs, add/delete from one tab and verify the other updates
6. **Theme Toggle**: Test light/dark mode toggle

### 7.2 Check Browser Console
- Open DevTools (F12)
- Go to Console tab
- Verify no error messages related to Supabase or environment variables

### 7.3 Verify Environment Variables
The app uses `NEXT_PUBLIC_*` prefixed variables, which are safe for the browser.

---

## Troubleshooting

### Issue: "Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL"

**Solution:**
1. Go to Vercel → Project Settings → Environment Variables
2. Verify both variables are added
3. Redeploy the project (automatic after adding vars)

### Issue: Google OAuth redirect fails

**Solution:**
1. Go to Supabase → Authentication → Providers → Google
2. Add your Vercel URL to the redirect URL list:
   ```
   https://your-app-name.vercel.app/auth/callback
   ```
3. Ensure Google provider is **enabled**

### Issue: Bookmarks not loading or saving

**Solution:**
1. Check Supabase Dashboard → SQL Editor → Run:
   ```sql
   SELECT * FROM public.bookmarks LIMIT 1;
   ```
2. Verify RLS policies are enabled:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'bookmarks';
   ```
3. Check browser console for Supabase auth errors

### Issue: Middleware deprecation warning

This is just a warning and doesn't affect functionality. It advises using the newer "proxy" feature in future Next.js versions.

---

## Post-Deployment

### Domain Setup (Optional)
1. Go to Vercel Project Settings → Domains
2. Add your custom domain (e.g., `bookmarks.yourdomain.com`)
3. Follow DNS configuration instructions

### Monitoring
- Monitor app performance in Vercel Analytics
- Check Supabase usage metrics regularly
- Set up error alerts if needed

### Scaling
- Vercel automatically scales based on traffic
- Supabase includes generous free tier; upgrade if needed

---

## Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)
- [Supabase Docs](https://supabase.com/docs)

---

## Support

If you encounter issues:
1. Check the Vercel deployment logs
2. Check the browser console for errors
3. Verify environment variables in Vercel
4. Check Supabase logs for database errors
5. Review the main README.md for architecture details
