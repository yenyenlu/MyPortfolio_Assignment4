# Portfolio (Assignment 4) – Netlify + MongoDB Atlas + Auth

This repo is a full functioning **demo portfolio website** (React/Vite) deployed on **Netlify**, with **college schoolmate sign up / sign in / sign out** using **MongoDB Atlas** and **Netlify Functions (serverless Express API)**.

## 1) Create MongoDB Atlas cluster (free)

1. Create an Atlas account → **Build a Database** → choose **M0 (Free)**.
2. Database Access → **Add New Database User** (username + password).
3. Network Access → **Add IP Address** → allow your current IP (for local dev) and/or `0.0.0.0/0` (for demo; more open).
4. Connect → **Drivers** → copy the connection string, e.g.
   `mongodb+srv://<user>:<pass>@cluster0.xxx.mongodb.net/portfolio?retryWrites=true&w=majority`

You will use it as `MONGODB_URI`.

## 2) Run locally

### Install
From repo root:
```bash
npm install
```

### Start local dev (frontend + functions)
```bash
npx netlify dev
```

Open: `http://localhost:8888`

## 3) Deploy to Netlify (CI/CD)

1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import from Git** and pick your repo.
3. Build settings are already in `netlify.toml`, but double-check:
   - Build command: `npm install && npm run build`
   - Publish directory: `client/dist`
   - Functions: `netlify/functions`

### Add Environment Variables in Netlify
Site settings → Environment variables:
- `MONGODB_URI` = your Atlas connection string
- `JWT_SECRET` = any long random string (example: `my_super_secret_...`)

Deploy. Your site will be live and auth will work.

## 4) API routes (serverless)

All API calls use this rewrite:
- Frontend calls: `/api/...`
- Netlify rewrites to the function: `/.netlify/functions/api/...`

Examples:
- `POST /api/users/register`
- `POST /api/users/login`
- `POST /api/users/logout`
- `GET /api/users/profile` (requires Bearer token)

## 5) Testing

### Unit test (Vitest)
```bash
npm run test:unit
```

### E2E test (Cypress)
Start the app first:
```bash
npx netlify dev
```

Then, in another terminal:
```bash
npm run test:e2e
```

## 6) Performance optimization checklist (what you can screenshot)

- Run Lighthouse (Chrome DevTools) before/after.
- Ensure production build (`npm run build`) is used for deployment.
- Use compressed images (webp), avoid huge PNGs.
- Add caching headers if you host large static assets.

## 7) Assignment submission

Use `Assignment4_SubmissionTemplate.docx` to paste screenshots:
- Unit testing result
- Cypress E2E result + recording link (if you used AI/Cypress recording)
- Deployment link + GitHub link
- CI/CD before/after screenshots (create branch → merge → Netlify redeploys)