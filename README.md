# Pine Wood Nirvana Jungle Resort — website

Demo site for **Pine Wood Nirvana Jungle Resort** (by GhumoG Stay), Village Paughat, Shoghi, Shimla.

Next.js 16 + Tailwind CSS v4, fully static — deploys to Vercel with zero config.

## What's in it
- Full-screen hero, three stay types with swipeable photo carousels, experiences, filterable gallery with lightbox, the resort film (YouTube, loaded only on play), map + turn-by-turn directions.
- **WhatsApp booking concierge** — a chat-style panel where guests pick a cottage, dates and guests; it opens WhatsApp with a ready-to-send booking message. Quick-question chips (location, rates, pets, celebrations) and a one-tap Call button.
- Sticky Call / WhatsApp bar on phones, schema.org `Resort` data for Google.

## Editing content
Everything client-specific (phone/WhatsApp number, room copy, photos, amenities, gallery) lives in [`src/lib/site.ts`](src/lib/site.ts). Photos are in `public/images/`.

## Run locally
```bash
npm install
npm run dev
```
