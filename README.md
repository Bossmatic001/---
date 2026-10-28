# Reply Desk — free starter

A mobile-first static web app with four reply styles, copy, and regenerate buttons.

## What is included
- iPhone-friendly responsive layout
- App Response, Friendship Seed, Soft Return, and Open Invite styles
- Copy and regenerate controls
- PWA manifest and basic service worker for install/offline caching
- No API key required

## Important limitations
- Replies come from simple local templates. This is **not AI generation** and it does not truly analyze the comment's meaning.
- There is **no login or access-key system** in this starter. Do not put private keys or secrets in front-end JavaScript.
- Each person's own revocable key requires a backend/auth provider (for example, Supabase Auth/Edge Functions or another server-side service). Configure it before distributing private access.
- Use HTTPS hosting for clipboard and service-worker features.
- GitHub Pages can host a static public repository for free on supported GitHub Free setups, but it is not a private-access control system and may not suit a commercial service. Check current hosting terms before launch.

## Free static deployment with GitHub Pages
1. Create/sign in to a GitHub account.
2. Create a new repository, for example `reply-desk`. For the simplest free setup, make it public.
3. Upload `index.html`, `styles.css`, `app.js`, `manifest.webmanifest`, `sw.js`, and `icon.svg` to the repository root.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
6. Wait for the published site URL shown on the Pages settings screen.
7. Open that URL in Safari on your iPhone. Tap **Share → Add to Home Screen**.

## To add individual private keys later
Use a real authentication backend. Store users/keys server-side, validate every protected request on the server, and add a revocation control. Do not implement this by simply hiding a page or placing keys in `app.js`; users can inspect client-side code.
