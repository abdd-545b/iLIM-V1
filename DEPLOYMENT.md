# iLIM Public Deployment Guide

iLIM is a responsive website built with Next.js. It is also prepared as an installable PWA, so family and friends can open it from a public link and, on supported browsers, add it to their home screen or dock. It is not a native App Store or Google Play mobile app in V1.

## Deploy To Vercel

1. Create a GitHub repository for this project.
2. Push the project files to GitHub.
3. Open [Vercel](https://vercel.com) and choose **Add New Project**.
4. Import the GitHub repository.
5. Keep these settings:
   - Framework Preset: `Next.js`
   - Install Command: `pnpm install`
   - Build Command: `pnpm build`
6. Click **Deploy**.
7. After deployment, Vercel will show a public URL like `https://ilim.vercel.app`.

## Share The Website

Send the Vercel URL to family and friends. They can open it in Safari, Chrome, Edge, or another modern browser.

## Install As PWA

Supported browsers can install iLIM:

- iPhone or iPad Safari: Share button, then **Add to Home Screen**.
- Android Chrome: Browser menu, then **Install app** or **Add to Home screen**.
- Mac or PC Chrome/Edge: Install icon in the address bar, or browser menu, then install.

The PWA uses `public/manifest.webmanifest`, `public/icon.svg`, and `public/sw.js`.

## Important V1 Note

Registration, login, XP, and lesson progress are stored locally in the user's browser. This is good for an MVP prototype, but a future production version should add a real backend database and server authentication.
