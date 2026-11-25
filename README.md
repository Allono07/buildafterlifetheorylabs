# Build Afterlife Theory Labs

A small Next.js app for collecting build ideas at `build.afterlifetheorylabs.com`.

## Local development

1. Install Node.js 20+ and run `npm install`.
2. Copy `.env.example` to `.env.local` and fill in your SMTP settings.
3. Run `npm run dev` and open http://localhost:3000.

`SMTP_USER` and `SMTP_PASS` are the sender account credentials (for Gmail, create an App Password). `IDEAS_TO` is the inbox that receives submissions. Keep credentials in the hosting provider's environment variable settings; never commit `.env.local`.

## Deploy

Import this directory as a standalone project into Vercel or Netlify with the Next.js preset. Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, and `IDEAS_TO` in the deployment environment. The form delivers each valid idea using SMTP; the API validates the 50-character minimum on the server as well as in the browser.
