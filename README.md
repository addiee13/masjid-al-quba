This is a [Next.js](https://nextjs.org) project for Masjid Al-Quba.

## Local Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deployment

Deployment workflow and environment setup are documented in:

- [`DEPLOYMENT.md`](./DEPLOYMENT.md)

Summary:

- Web app deploys on **Vercel** from repo root.
- Sanity Studio deploys separately from `sanity/`.
- Recommended branch flow: `main` (production), PRs (preview).
- `SANITY_WRITE_TOKEN` should be **Production-only** in Vercel env vars.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Vercel Documentation](https://vercel.com/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
